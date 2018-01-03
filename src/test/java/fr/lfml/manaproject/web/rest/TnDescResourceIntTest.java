package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.TnDesc;
import fr.lfml.manaproject.repository.TnDescRepository;
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
 * Test class for the TnDescResource REST controller.
 *
 * @see TnDescResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class TnDescResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TnDescRepository tnDescRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTnDescMockMvc;

    private TnDesc tnDesc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TnDescResource tnDescResource = new TnDescResource(tnDescRepository);
        this.restTnDescMockMvc = MockMvcBuilders.standaloneSetup(tnDescResource)
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
    public static TnDesc createEntity(EntityManager em) {
        TnDesc tnDesc = new TnDesc()
            .description(DEFAULT_DESCRIPTION);
        return tnDesc;
    }

    @Before
    public void initTest() {
        tnDesc = createEntity(em);
    }

    @Test
    @Transactional
    public void createTnDesc() throws Exception {
        int databaseSizeBeforeCreate = tnDescRepository.findAll().size();

        // Create the TnDesc
        restTnDescMockMvc.perform(post("/api/tn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tnDesc)))
            .andExpect(status().isCreated());

        // Validate the TnDesc in the database
        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeCreate + 1);
        TnDesc testTnDesc = tnDescList.get(tnDescList.size() - 1);
        assertThat(testTnDesc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTnDescWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tnDescRepository.findAll().size();

        // Create the TnDesc with an existing ID
        tnDesc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTnDescMockMvc.perform(post("/api/tn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tnDesc)))
            .andExpect(status().isBadRequest());

        // Validate the TnDesc in the database
        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tnDescRepository.findAll().size();
        // set the field null
        tnDesc.setDescription(null);

        // Create the TnDesc, which fails.

        restTnDescMockMvc.perform(post("/api/tn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tnDesc)))
            .andExpect(status().isBadRequest());

        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTnDescs() throws Exception {
        // Initialize the database
        tnDescRepository.saveAndFlush(tnDesc);

        // Get all the tnDescList
        restTnDescMockMvc.perform(get("/api/tn-descs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tnDesc.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getTnDesc() throws Exception {
        // Initialize the database
        tnDescRepository.saveAndFlush(tnDesc);

        // Get the tnDesc
        restTnDescMockMvc.perform(get("/api/tn-descs/{id}", tnDesc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tnDesc.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTnDesc() throws Exception {
        // Get the tnDesc
        restTnDescMockMvc.perform(get("/api/tn-descs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTnDesc() throws Exception {
        // Initialize the database
        tnDescRepository.saveAndFlush(tnDesc);
        int databaseSizeBeforeUpdate = tnDescRepository.findAll().size();

        // Update the tnDesc
        TnDesc updatedTnDesc = tnDescRepository.findOne(tnDesc.getId());
        updatedTnDesc
            .description(UPDATED_DESCRIPTION);

        restTnDescMockMvc.perform(put("/api/tn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTnDesc)))
            .andExpect(status().isOk());

        // Validate the TnDesc in the database
        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeUpdate);
        TnDesc testTnDesc = tnDescList.get(tnDescList.size() - 1);
        assertThat(testTnDesc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTnDesc() throws Exception {
        int databaseSizeBeforeUpdate = tnDescRepository.findAll().size();

        // Create the TnDesc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTnDescMockMvc.perform(put("/api/tn-descs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tnDesc)))
            .andExpect(status().isCreated());

        // Validate the TnDesc in the database
        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTnDesc() throws Exception {
        // Initialize the database
        tnDescRepository.saveAndFlush(tnDesc);
        int databaseSizeBeforeDelete = tnDescRepository.findAll().size();

        // Get the tnDesc
        restTnDescMockMvc.perform(delete("/api/tn-descs/{id}", tnDesc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TnDesc> tnDescList = tnDescRepository.findAll();
        assertThat(tnDescList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TnDesc.class);
        TnDesc tnDesc1 = new TnDesc();
        tnDesc1.setId(1L);
        TnDesc tnDesc2 = new TnDesc();
        tnDesc2.setId(tnDesc1.getId());
        assertThat(tnDesc1).isEqualTo(tnDesc2);
        tnDesc2.setId(2L);
        assertThat(tnDesc1).isNotEqualTo(tnDesc2);
        tnDesc1.setId(null);
        assertThat(tnDesc1).isNotEqualTo(tnDesc2);
    }
}
