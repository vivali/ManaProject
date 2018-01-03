package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.PreRelationships;
import fr.lfml.manaproject.repository.PreRelationshipsRepository;
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
 * Test class for the PreRelationshipsResource REST controller.
 *
 * @see PreRelationshipsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class PreRelationshipsResourceIntTest {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    @Autowired
    private PreRelationshipsRepository preRelationshipsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPreRelationshipsMockMvc;

    private PreRelationships preRelationships;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PreRelationshipsResource preRelationshipsResource = new PreRelationshipsResource(preRelationshipsRepository);
        this.restPreRelationshipsMockMvc = MockMvcBuilders.standaloneSetup(preRelationshipsResource)
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
    public static PreRelationships createEntity(EntityManager em) {
        PreRelationships preRelationships = new PreRelationships()
            .number(DEFAULT_NUMBER);
        return preRelationships;
    }

    @Before
    public void initTest() {
        preRelationships = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreRelationships() throws Exception {
        int databaseSizeBeforeCreate = preRelationshipsRepository.findAll().size();

        // Create the PreRelationships
        restPreRelationshipsMockMvc.perform(post("/api/pre-relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preRelationships)))
            .andExpect(status().isCreated());

        // Validate the PreRelationships in the database
        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeCreate + 1);
        PreRelationships testPreRelationships = preRelationshipsList.get(preRelationshipsList.size() - 1);
        assertThat(testPreRelationships.getNumber()).isEqualTo(DEFAULT_NUMBER);
    }

    @Test
    @Transactional
    public void createPreRelationshipsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = preRelationshipsRepository.findAll().size();

        // Create the PreRelationships with an existing ID
        preRelationships.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPreRelationshipsMockMvc.perform(post("/api/pre-relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preRelationships)))
            .andExpect(status().isBadRequest());

        // Validate the PreRelationships in the database
        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = preRelationshipsRepository.findAll().size();
        // set the field null
        preRelationships.setNumber(null);

        // Create the PreRelationships, which fails.

        restPreRelationshipsMockMvc.perform(post("/api/pre-relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preRelationships)))
            .andExpect(status().isBadRequest());

        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPreRelationships() throws Exception {
        // Initialize the database
        preRelationshipsRepository.saveAndFlush(preRelationships);

        // Get all the preRelationshipsList
        restPreRelationshipsMockMvc.perform(get("/api/pre-relationships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(preRelationships.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)));
    }

    @Test
    @Transactional
    public void getPreRelationships() throws Exception {
        // Initialize the database
        preRelationshipsRepository.saveAndFlush(preRelationships);

        // Get the preRelationships
        restPreRelationshipsMockMvc.perform(get("/api/pre-relationships/{id}", preRelationships.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(preRelationships.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingPreRelationships() throws Exception {
        // Get the preRelationships
        restPreRelationshipsMockMvc.perform(get("/api/pre-relationships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePreRelationships() throws Exception {
        // Initialize the database
        preRelationshipsRepository.saveAndFlush(preRelationships);
        int databaseSizeBeforeUpdate = preRelationshipsRepository.findAll().size();

        // Update the preRelationships
        PreRelationships updatedPreRelationships = preRelationshipsRepository.findOne(preRelationships.getId());
        updatedPreRelationships
            .number(UPDATED_NUMBER);

        restPreRelationshipsMockMvc.perform(put("/api/pre-relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPreRelationships)))
            .andExpect(status().isOk());

        // Validate the PreRelationships in the database
        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeUpdate);
        PreRelationships testPreRelationships = preRelationshipsList.get(preRelationshipsList.size() - 1);
        assertThat(testPreRelationships.getNumber()).isEqualTo(UPDATED_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPreRelationships() throws Exception {
        int databaseSizeBeforeUpdate = preRelationshipsRepository.findAll().size();

        // Create the PreRelationships

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPreRelationshipsMockMvc.perform(put("/api/pre-relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(preRelationships)))
            .andExpect(status().isCreated());

        // Validate the PreRelationships in the database
        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePreRelationships() throws Exception {
        // Initialize the database
        preRelationshipsRepository.saveAndFlush(preRelationships);
        int databaseSizeBeforeDelete = preRelationshipsRepository.findAll().size();

        // Get the preRelationships
        restPreRelationshipsMockMvc.perform(delete("/api/pre-relationships/{id}", preRelationships.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PreRelationships> preRelationshipsList = preRelationshipsRepository.findAll();
        assertThat(preRelationshipsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PreRelationships.class);
        PreRelationships preRelationships1 = new PreRelationships();
        preRelationships1.setId(1L);
        PreRelationships preRelationships2 = new PreRelationships();
        preRelationships2.setId(preRelationships1.getId());
        assertThat(preRelationships1).isEqualTo(preRelationships2);
        preRelationships2.setId(2L);
        assertThat(preRelationships1).isNotEqualTo(preRelationships2);
        preRelationships1.setId(null);
        assertThat(preRelationships1).isNotEqualTo(preRelationships2);
    }
}
