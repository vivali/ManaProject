package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.TechNeed;
import fr.lfml.manaproject.repository.TechNeedRepository;
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
 * Test class for the TechNeedResource REST controller.
 *
 * @see TechNeedResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class TechNeedResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private TechNeedRepository techNeedRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTechNeedMockMvc;

    private TechNeed techNeed;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TechNeedResource techNeedResource = new TechNeedResource(techNeedRepository);
        this.restTechNeedMockMvc = MockMvcBuilders.standaloneSetup(techNeedResource)
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
    public static TechNeed createEntity(EntityManager em) {
        TechNeed techNeed = new TechNeed()
            .title(DEFAULT_TITLE);
        return techNeed;
    }

    @Before
    public void initTest() {
        techNeed = createEntity(em);
    }

    @Test
    @Transactional
    public void createTechNeed() throws Exception {
        int databaseSizeBeforeCreate = techNeedRepository.findAll().size();

        // Create the TechNeed
        restTechNeedMockMvc.perform(post("/api/tech-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techNeed)))
            .andExpect(status().isCreated());

        // Validate the TechNeed in the database
        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeCreate + 1);
        TechNeed testTechNeed = techNeedList.get(techNeedList.size() - 1);
        assertThat(testTechNeed.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createTechNeedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = techNeedRepository.findAll().size();

        // Create the TechNeed with an existing ID
        techNeed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTechNeedMockMvc.perform(post("/api/tech-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techNeed)))
            .andExpect(status().isBadRequest());

        // Validate the TechNeed in the database
        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = techNeedRepository.findAll().size();
        // set the field null
        techNeed.setTitle(null);

        // Create the TechNeed, which fails.

        restTechNeedMockMvc.perform(post("/api/tech-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techNeed)))
            .andExpect(status().isBadRequest());

        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTechNeeds() throws Exception {
        // Initialize the database
        techNeedRepository.saveAndFlush(techNeed);

        // Get all the techNeedList
        restTechNeedMockMvc.perform(get("/api/tech-needs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(techNeed.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getTechNeed() throws Exception {
        // Initialize the database
        techNeedRepository.saveAndFlush(techNeed);

        // Get the techNeed
        restTechNeedMockMvc.perform(get("/api/tech-needs/{id}", techNeed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(techNeed.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTechNeed() throws Exception {
        // Get the techNeed
        restTechNeedMockMvc.perform(get("/api/tech-needs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTechNeed() throws Exception {
        // Initialize the database
        techNeedRepository.saveAndFlush(techNeed);
        int databaseSizeBeforeUpdate = techNeedRepository.findAll().size();

        // Update the techNeed
        TechNeed updatedTechNeed = techNeedRepository.findOne(techNeed.getId());
        updatedTechNeed
            .title(UPDATED_TITLE);

        restTechNeedMockMvc.perform(put("/api/tech-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTechNeed)))
            .andExpect(status().isOk());

        // Validate the TechNeed in the database
        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeUpdate);
        TechNeed testTechNeed = techNeedList.get(techNeedList.size() - 1);
        assertThat(testTechNeed.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTechNeed() throws Exception {
        int databaseSizeBeforeUpdate = techNeedRepository.findAll().size();

        // Create the TechNeed

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTechNeedMockMvc.perform(put("/api/tech-needs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techNeed)))
            .andExpect(status().isCreated());

        // Validate the TechNeed in the database
        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTechNeed() throws Exception {
        // Initialize the database
        techNeedRepository.saveAndFlush(techNeed);
        int databaseSizeBeforeDelete = techNeedRepository.findAll().size();

        // Get the techNeed
        restTechNeedMockMvc.perform(delete("/api/tech-needs/{id}", techNeed.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TechNeed> techNeedList = techNeedRepository.findAll();
        assertThat(techNeedList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TechNeed.class);
        TechNeed techNeed1 = new TechNeed();
        techNeed1.setId(1L);
        TechNeed techNeed2 = new TechNeed();
        techNeed2.setId(techNeed1.getId());
        assertThat(techNeed1).isEqualTo(techNeed2);
        techNeed2.setId(2L);
        assertThat(techNeed1).isNotEqualTo(techNeed2);
        techNeed1.setId(null);
        assertThat(techNeed1).isNotEqualTo(techNeed2);
    }
}
