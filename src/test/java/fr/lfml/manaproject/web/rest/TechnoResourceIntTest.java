package fr.lfml.manaproject.web.rest;

import fr.lfml.manaproject.ManaProjectApp;

import fr.lfml.manaproject.domain.Techno;
import fr.lfml.manaproject.repository.TechnoRepository;
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
 * Test class for the TechnoResource REST controller.
 *
 * @see TechnoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ManaProjectApp.class)
public class TechnoResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private TechnoRepository technoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTechnoMockMvc;

    private Techno techno;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TechnoResource technoResource = new TechnoResource(technoRepository);
        this.restTechnoMockMvc = MockMvcBuilders.standaloneSetup(technoResource)
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
    public static Techno createEntity(EntityManager em) {
        Techno techno = new Techno()
            .title(DEFAULT_TITLE);
        return techno;
    }

    @Before
    public void initTest() {
        techno = createEntity(em);
    }

    @Test
    @Transactional
    public void createTechno() throws Exception {
        int databaseSizeBeforeCreate = technoRepository.findAll().size();

        // Create the Techno
        restTechnoMockMvc.perform(post("/api/technos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techno)))
            .andExpect(status().isCreated());

        // Validate the Techno in the database
        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeCreate + 1);
        Techno testTechno = technoList.get(technoList.size() - 1);
        assertThat(testTechno.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createTechnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = technoRepository.findAll().size();

        // Create the Techno with an existing ID
        techno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTechnoMockMvc.perform(post("/api/technos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techno)))
            .andExpect(status().isBadRequest());

        // Validate the Techno in the database
        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = technoRepository.findAll().size();
        // set the field null
        techno.setTitle(null);

        // Create the Techno, which fails.

        restTechnoMockMvc.perform(post("/api/technos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techno)))
            .andExpect(status().isBadRequest());

        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTechnos() throws Exception {
        // Initialize the database
        technoRepository.saveAndFlush(techno);

        // Get all the technoList
        restTechnoMockMvc.perform(get("/api/technos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(techno.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getTechno() throws Exception {
        // Initialize the database
        technoRepository.saveAndFlush(techno);

        // Get the techno
        restTechnoMockMvc.perform(get("/api/technos/{id}", techno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(techno.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTechno() throws Exception {
        // Get the techno
        restTechnoMockMvc.perform(get("/api/technos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTechno() throws Exception {
        // Initialize the database
        technoRepository.saveAndFlush(techno);
        int databaseSizeBeforeUpdate = technoRepository.findAll().size();

        // Update the techno
        Techno updatedTechno = technoRepository.findOne(techno.getId());
        updatedTechno
            .title(UPDATED_TITLE);

        restTechnoMockMvc.perform(put("/api/technos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTechno)))
            .andExpect(status().isOk());

        // Validate the Techno in the database
        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeUpdate);
        Techno testTechno = technoList.get(technoList.size() - 1);
        assertThat(testTechno.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTechno() throws Exception {
        int databaseSizeBeforeUpdate = technoRepository.findAll().size();

        // Create the Techno

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTechnoMockMvc.perform(put("/api/technos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(techno)))
            .andExpect(status().isCreated());

        // Validate the Techno in the database
        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTechno() throws Exception {
        // Initialize the database
        technoRepository.saveAndFlush(techno);
        int databaseSizeBeforeDelete = technoRepository.findAll().size();

        // Get the techno
        restTechnoMockMvc.perform(delete("/api/technos/{id}", techno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Techno> technoList = technoRepository.findAll();
        assertThat(technoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Techno.class);
        Techno techno1 = new Techno();
        techno1.setId(1L);
        Techno techno2 = new Techno();
        techno2.setId(techno1.getId());
        assertThat(techno1).isEqualTo(techno2);
        techno2.setId(2L);
        assertThat(techno1).isNotEqualTo(techno2);
        techno1.setId(null);
        assertThat(techno1).isNotEqualTo(techno2);
    }
}
