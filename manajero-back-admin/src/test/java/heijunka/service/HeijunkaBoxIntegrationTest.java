package heijunka.service;

import heijunka.entite.HeijunkaBox;
import heijunka.repository.HeijunkaBoxRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class HeijunkaBoxIntegrationTest {

    @Autowired
    private HeijunkaBoxService service;

    @Autowired
    private HeijunkaBoxRepo repository;

    private HeijunkaBox heijunkaBox;

    @BeforeEach
    public void setup() {
        heijunkaBox = new HeijunkaBox();
        heijunkaBox.setTitle("Test Box");
        heijunkaBox.setTimestamp(new Date());
        heijunkaBox.setNotes("Test Notes");
        heijunkaBox.setImage("Test Image");
        heijunkaBox.setArchived(false);
    }

    @AfterEach
    public void tearDown() {
        repository.deleteAll();
    }

    @Test
    public void testGetAllHeijunkaBoxes() {
        // Arrange
        repository.save(heijunkaBox);

        // Act
        List<HeijunkaBox> result = service.getAllHeijunkaBoxes();

        // Assert
        assertEquals(1, result.size());
        assertEquals(heijunkaBox.getTitle(), result.get(0).getTitle());
    }

    @Test
    public void testGetHeijunkaBoxById() {
        // Arrange
        HeijunkaBox savedBox = repository.save(heijunkaBox);

        // Act
        Optional<HeijunkaBox> result = service.getHeijunkaBoxById(savedBox.getIdBox());

        // Assert
        assertEquals(savedBox.getTitle(), result.get().getTitle());
    }

    @Test
    public void testCreateHeijunkaBox() {
        // Act
        HeijunkaBox result = service.createHeijunkaBox(heijunkaBox);

        // Assert
        assertEquals(heijunkaBox.getTitle(), result.getTitle());
    }

    @Test
    public void testUpdateHeijunkaBox() {
        // Arrange
        HeijunkaBox savedBox = repository.save(heijunkaBox);
        savedBox.setTitle("Updated Title");

        // Act
        HeijunkaBox result = service.updateHeijunkaBox(savedBox.getIdBox(), savedBox);

        // Assert
        assertEquals(savedBox.getTitle(), result.getTitle());
    }

    @Test
    public void testDeleteHeijunkaBox() {
        // Arrange
        HeijunkaBox savedBox = repository.save(heijunkaBox);

        // Act
        service.deleteHeijunkaBox(savedBox.getIdBox());

        // Assert
        assertEquals(0, repository.count());
    }

    @Test
    public void testGetLatestHeijunkaBox() {
        // Arrange
        repository.save(heijunkaBox);

        // Act
        HeijunkaBox result = service.getLatestHeijunkaBox();

        // Assert
        assertEquals(heijunkaBox.getTitle(), result.getTitle());
    }

    @Test
    public void testArchiveHeijunkaBox() {
        // Arrange
        HeijunkaBox savedBox = repository.save(heijunkaBox);

        // Act
        service.archiveHeijunkaBox(savedBox.getIdBox());

        // Assert
        assertEquals(true, repository.findById(savedBox.getIdBox()).get().isArchived());
    }

    @Test
    public void testRestoreHeijunkaBox() {
        // Arrange
        HeijunkaBox savedBox = repository.save(heijunkaBox);
        savedBox.setArchived(true);
        repository.save(savedBox);

        // Act
        service.restoreHeijunkaBox(savedBox.getIdBox());

        // Assert
        assertEquals(false, repository.findById(savedBox.getIdBox()).get().isArchived());
    }
    @Test
    public void testGetArchivedHeijunkaBoxes() {
        // Arrange
        heijunkaBox.setArchived(true);
        repository.save(heijunkaBox);

        // Act
        List<HeijunkaBox> result = service.getArchivedHeijunkaBoxes();

        // Assert
        assertEquals(1, result.size());
        assertEquals(heijunkaBox.getTitle(), result.get(0).getTitle());
    }

    @Test
    public void testGetAllNonArchivedHeijunkaBoxes() {
        // Arrange
        repository.save(heijunkaBox);

        // Act
        List<HeijunkaBox> result = service.getAllNonArchivedHeijunkaBoxes();

        // Assert
        assertEquals(1, result.size());
        assertEquals(heijunkaBox.getTitle(), result.get(0).getTitle());
    }



    @Test
    public void testUpdateHeijunkaBoxNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> service.updateHeijunkaBox("1", heijunkaBox));
    }

    @Test
    public void testDeleteHeijunkaBoxNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> service.deleteHeijunkaBox("1"));
    }

    @Test
    public void testArchiveHeijunkaBoxNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> service.archiveHeijunkaBox("1"));
    }

    @Test
    public void testRestoreHeijunkaBoxNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> service.restoreHeijunkaBox("1"));
    }
}