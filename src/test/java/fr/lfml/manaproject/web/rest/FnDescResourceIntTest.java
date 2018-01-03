package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.FnDesc;
import fr.lfml.manaproject.repository.FnDescRepository;
import fr.lfml.manaproject.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static fr.lfml.manaproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FnDescResource REST controller.
 *
 * @see FnDescResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class FnDescResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FnDescRepository fnDescRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFnDescMockMvc;

    private FnDesc fnDesc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FnDescResource fnDescResource = new FnDescResource(fnDescRepository);
        this.restFnDescMockMvc = MockMvcBuilders.standaloneSetup(fnDescResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FnDesc createEntity(EntityManager em) {
        FnDesc fnDesc = new FnDesc()
            .description(DEFAULT_DESCRIPTION);
        return fnDesc;
    }

    @Before
    public void initTest() {
        fnDesc = createEntity(em);
    }

    @Test
    @Transactional
    public void createFnDesc() throws Exception {
        int databaseSizeBeforeCreate = fnDescRepository.findAll().size();

        // Create the FnDesc
        restFnDescMockMvc.perform(post("/api/fn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fnDesc)))
            .andExpect(status().isCreated());

        // Validate the FnDesc in the database
        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeCreate + 1);
        FnDesc testFnDesc = fnDescList.get(fnDescList.size() - 1);
        assertThat(testFnDesc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFnDescWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fnDescRepository.findAll().size();

        // Create the FnDesc with an existing ID
        fnDesc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFnDescMockMvc.perform(post("/api/fn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fnDesc)))
            .andExpect(status().isBadRequest());

        // Validate the FnDesc in the database
        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = fnDescRepository.findAll().size();
        // set the field null
        fnDesc.setDescription(null);

        // Create the FnDesc, which fails.

        restFnDescMockMvc.perform(post("/api/fn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fnDesc)))
            .andExpect(status().isBadRequest());

        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFnDescs() throws Exception {
        // Initialize the database
        fnDescRepository.saveAndFlush(fnDesc);

        // Get all the fnDescList
        restFnDescMockMvc.perform(get("/api/fn-descs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fnDesc.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getFnDesc() throws Exception {
        // Initialize the database
        fnDescRepository.saveAndFlush(fnDesc);

        // Get the fnDesc
        restFnDescMockMvc.perform(get("/api/fn-descs/{id}", fnDesc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fnDesc.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFnDesc() throws Exception {
        // Get the fnDesc
        restFnDescMockMvc.perform(get("/api/fn-descs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFnDesc() throws Exception {
        // Initialize the database
        fnDescRepository.saveAndFlush(fnDesc);
        int databaseSizeBeforeUpdate = fnDescRepository.findAll().size();

        // Update the fnDesc
        FnDesc updatedFnDesc = fnDescRepository.findOne(fnDesc.getId());
        updatedFnDesc
            .description(UPDATED_DESCRIPTION);

        restFnDescMockMvc.perform(put("/api/fn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFnDesc)))
            .andExpect(status().isOk());

        // Validate the FnDesc in the database
        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeUpdate);
        FnDesc testFnDesc = fnDescList.get(fnDescList.size() - 1);
        assertThat(testFnDesc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFnDesc() throws Exception {
        int databaseSizeBeforeUpdate = fnDescRepository.findAll().size();

        // Create the FnDesc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFnDescMockMvc.perform(put("/api/fn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fnDesc)))
            .andExpect(status().isCreated());

        // Validate the FnDesc in the database
        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFnDesc() throws Exception {
        // Initialize the database
        fnDescRepository.saveAndFlush(fnDesc);
        int databaseSizeBeforeDelete = fnDescRepository.findAll().size();

        // Get the fnDesc
        restFnDescMockMvc.perform(delete("/api/fn-descs/{id}", fnDesc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FnDesc> fnDescList = fnDescRepository.findAll();
        assertThat(fnDescList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FnDesc.class);
        FnDesc fnDesc1 = new FnDesc();
        fnDesc1.setId(1L);
        FnDesc fnDesc2 = new FnDesc();
        fnDesc2.setId(fnDesc1.getId());
        assertThat(fnDesc1).isEqualTo(fnDesc2);
        fnDesc2.setId(2L);
        assertThat(fnDesc1).isNotEqualTo(fnDesc2);
        fnDesc1.setId(null);
        assertThat(fnDesc1).isNotEqualTo(fnDesc2);
    }
}
