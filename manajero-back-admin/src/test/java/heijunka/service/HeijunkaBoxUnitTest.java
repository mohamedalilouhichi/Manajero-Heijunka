package heijunka.service;

import heijunka.entite.HeijunkaBox;
import heijunka.repository.HeijunkaBoxRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HeijunkaBoxUnitTest {

    @Mock
    private HeijunkaBoxRepo repository;

    @InjectMocks
    private HeijunkaBoxService service;

    @Test
    void testGetAllHeijunkaBoxes() {
        List<HeijunkaBox> boxes = List.of(new HeijunkaBox(), new HeijunkaBox());
        when(repository.findAll()).thenReturn(boxes);
        List<HeijunkaBox> result = service.getAllHeijunkaBoxes();
        assertEquals(boxes, result);
    }

    @Test
    void testGetHeijunkaBoxById() {
        HeijunkaBox box = new HeijunkaBox();
        when(repository.findById("id")).thenReturn(Optional.of(box));
        Optional<HeijunkaBox> result = service.getHeijunkaBoxById("id");
        assertEquals(box, result.get());
    }

    @Test
    void testCreateHeijunkaBox() {
        HeijunkaBox box = new HeijunkaBox();
        when(repository.save(box)).thenReturn(box);
        HeijunkaBox result = service.createHeijunkaBox(box);
        assertEquals(box, result);
    }

    @Test
    void testUpdateHeijunkaBox() {
        HeijunkaBox box = new HeijunkaBox();
        when(repository.existsById("id")).thenReturn(true);
        when(repository.save(box)).thenReturn(box);
        HeijunkaBox result = service.updateHeijunkaBox("id", box);
        assertEquals(box, result);
    }

    @Test
    void testDeleteHeijunkaBox() {
        when(repository.existsById("id")).thenReturn(true);
        service.deleteHeijunkaBox("id");
        // no exception thrown, test passes
    }

    @Test
    void testGetLatestHeijunkaBox() {
        List<HeijunkaBox> boxes = List.of(new HeijunkaBox(), new HeijunkaBox());
        when(repository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"))).thenReturn(boxes);
        HeijunkaBox result = service.getLatestHeijunkaBox();
        assertNotNull(result);
    }

    @Test
    void testArchiveHeijunkaBox() {
        HeijunkaBox box = new HeijunkaBox();
        when(repository.findById("id")).thenReturn(Optional.of(box));
        service.archiveHeijunkaBox("id");
        assertEquals(true, box.isArchived());
    }

    @Test
    void testRestoreHeijunkaBox() {
        HeijunkaBox box = new HeijunkaBox();
        when(repository.findById("id")).thenReturn(Optional.of(box));
        service.restoreHeijunkaBox("id");
        assertEquals(false, box.isArchived());
    }

    @Test
    void testGetArchivedHeijunkaBoxes() {
        List<HeijunkaBox> boxes = List.of(new HeijunkaBox(), new HeijunkaBox());
        when(repository.findByArchived(true)).thenReturn(boxes);
        List<HeijunkaBox> result = service.getArchivedHeijunkaBoxes();
        assertEquals(boxes, result);
    }
    @Test
    void testGetAllNonArchivedHeijunkaBoxes() {
        List<HeijunkaBox> boxes = List.of(new HeijunkaBox(), new HeijunkaBox());
        when(repository.findByArchived(false)).thenReturn(boxes);
        List<HeijunkaBox> result = service.getAllNonArchivedHeijunkaBoxes();
        assertEquals(boxes, result);
    }
}