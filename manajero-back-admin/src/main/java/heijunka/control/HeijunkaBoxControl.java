package heijunka.control;

import heijunka.entite.HeijunkaBox;
import heijunka.service.HeijunkaBoxService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/heijunkabox")
public class HeijunkaBoxControl {

    private final HeijunkaBoxService service;

    @GetMapping
    public ResponseEntity<List<HeijunkaBox>> getAllHeijunkaBoxes() {
        List<HeijunkaBox> boxes = service.getAllNonArchivedHeijunkaBoxes();
        return new ResponseEntity<>(boxes, HttpStatus.OK);
    }
@GetMapping("/latest")
    public ResponseEntity<HeijunkaBox> getLatestHeijunkaBox() {
        HeijunkaBox box = service.getLatestHeijunkaBox();
        return new ResponseEntity<>(box, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<HeijunkaBox> getHeijunkaBoxById(@PathVariable String id) {
        Optional<HeijunkaBox> box = service.getHeijunkaBoxById(id);
        return box.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HeijunkaBox> createHeijunkaBox(@RequestBody HeijunkaBox heijunkaBox) {
        HeijunkaBox createdBox = service.createHeijunkaBox(heijunkaBox);
        return new ResponseEntity<>(createdBox, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HeijunkaBox> updateHeijunkaBox(@PathVariable String id, @RequestBody HeijunkaBox heijunkaBox) {
        try {
            HeijunkaBox updatedBox = service.updateHeijunkaBox(id, heijunkaBox);
            return new ResponseEntity<>(updatedBox, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHeijunkaBox(@PathVariable String id) {
        try {
            service.deleteHeijunkaBox(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archiveHeijunkaBox(@PathVariable String id) {
        service.archiveHeijunkaBox(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restoreHeijunkaBox(@PathVariable String id) {
        service.restoreHeijunkaBox(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/archived")
    public ResponseEntity<List<HeijunkaBox>> getArchivedHeijunkaBoxes() {
        List<HeijunkaBox> archivedBoxes = service.getArchivedHeijunkaBoxes();
        return new ResponseEntity<>(archivedBoxes, HttpStatus.OK);
    }
}
