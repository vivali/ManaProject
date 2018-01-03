package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.FuncNeed;
import fr.lfml.manaproject.repository.FuncNeedRepository;
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
 * Test class for the FuncNeedResource REST controller.
 *
 * @see FuncNeedResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class FuncNeedResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private FuncNeedRepository funcNeedRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFuncNeedMockMvc;

    private FuncNeed funcNeed;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FuncNeedResource funcNeedResource = new FuncNeedResource(funcNeedRepository);
        this.restFuncNeedMockMvc = MockMvcBuilders.standaloneSetup(funcNeedResource)
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
    public static FuncNeed createEntity(EntityManager em) {
        FuncNeed funcNeed = new FuncNeed()
            .title(DEFAULT_TITLE);
        return funcNeed;
    }

    @Before
    public void initTest() {
        funcNeed = createEntity(em);
    }

    @Test
    @Transactional
    public void createFuncNeed() throws Exception {
        int databaseSizeBeforeCreate = funcNeedRepository.findAll().size();

        // Create the FuncNeed
        restFuncNeedMockMvc.perform(post("/api/func-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(funcNeed)))
            .andExpect(status().isCreated());

        // Validate the FuncNeed in the database
        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeCreate + 1);
        FuncNeed testFuncNeed = funcNeedList.get(funcNeedList.size() - 1);
        assertThat(testFuncNeed.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createFuncNeedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = funcNeedRepository.findAll().size();

        // Create the FuncNeed with an existing ID
        funcNeed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFuncNeedMockMvc.perform(post("/api/func-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(funcNeed)))
            .andExpect(status().isBadRequest());

        // Validate the FuncNeed in the database
        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = funcNeedRepository.findAll().size();
        // set the field null
        funcNeed.setTitle(null);

        // Create the FuncNeed, which fails.

        restFuncNeedMockMvc.perform(post("/api/func-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(funcNeed)))
            .andExpect(status().isBadRequest());

        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFuncNeeds() throws Exception {
        // Initialize the database
        funcNeedRepository.saveAndFlush(funcNeed);

        // Get all the funcNeedList
        restFuncNeedMockMvc.perform(get("/api/func-needs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(funcNeed.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getFuncNeed() throws Exception {
        // Initialize the database
        funcNeedRepository.saveAndFlush(funcNeed);

        // Get the funcNeed
        restFuncNeedMockMvc.perform(get("/api/func-needs/{id}", funcNeed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(funcNeed.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFuncNeed() throws Exception {
        // Get the funcNeed
        restFuncNeedMockMvc.perform(get("/api/func-needs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFuncNeed() throws Exception {
        // Initialize the database
        funcNeedRepository.saveAndFlush(funcNeed);
        int databaseSizeBeforeUpdate = funcNeedRepository.findAll().size();

        // Update the funcNeed
        FuncNeed updatedFuncNeed = funcNeedRepository.findOne(funcNeed.getId());
        updatedFuncNeed
            .title(UPDATED_TITLE);

        restFuncNeedMockMvc.perform(put("/api/func-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFuncNeed)))
            .andExpect(status().isOk());

        // Validate the FuncNeed in the database
        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeUpdate);
        FuncNeed testFuncNeed = funcNeedList.get(funcNeedList.size() - 1);
        assertThat(testFuncNeed.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingFuncNeed() throws Exception {
        int databaseSizeBeforeUpdate = funcNeedRepository.findAll().size();

        // Create the FuncNeed

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFuncNeedMockMvc.perform(put("/api/func-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(funcNeed)))
            .andExpect(status().isCreated());

        // Validate the FuncNeed in the database
        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFuncNeed() throws Exception {
        // Initialize the database
        funcNeedRepository.saveAndFlush(funcNeed);
        int databaseSizeBeforeDelete = funcNeedRepository.findAll().size();

        // Get the funcNeed
        restFuncNeedMockMvc.perform(delete("/api/func-needs/{id}", funcNeed.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FuncNeed> funcNeedList = funcNeedRepository.findAll();
        assertThat(funcNeedList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FuncNeed.class);
        FuncNeed funcNeed1 = new FuncNeed();
        funcNeed1.setId(1L);
        FuncNeed funcNeed2 = new FuncNeed();
        funcNeed2.setId(funcNeed1.getId());
        assertThat(funcNeed1).isEqualTo(funcNeed2);
        funcNeed2.setId(2L);
        assertThat(funcNeed1).isNotEqualTo(funcNeed2);
        funcNeed1.setId(null);
        assertThat(funcNeed1).isNotEqualTo(funcNeed2);
    }
}
