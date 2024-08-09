package heijunka.service;

import heijunka.entite.HeijunkaBox;
import heijunka.repository.HeijunkaBoxRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class HeijunkaBoxService implements IHeijunkaBoxService {

    private final HeijunkaBoxRepo repository;

    public List<HeijunkaBox> getAllHeijunkaBoxes() {
        return repository.findAll();
    }

    public Optional<HeijunkaBox> getHeijunkaBoxById(String id) {
        return repository.findById(id);
    }

    public HeijunkaBox createHeijunkaBox(HeijunkaBox heijunkaBox) {
        return repository.save(heijunkaBox);
    }

    public HeijunkaBox updateHeijunkaBox(String id, HeijunkaBox heijunkaBox) {
        if (repository.existsById(id)) {
            heijunkaBox.setIdBox(id);
            return repository.save(heijunkaBox);
        } else {
            throw new RuntimeException("HeijunkaBox not found");
        }
    }

    public void deleteHeijunkaBox(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("HeijunkaBox not found");
        }
    }

    public HeijunkaBox getLatestHeijunkaBox() {
        List<HeijunkaBox> boxes = repository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
        if (!boxes.isEmpty()) {
            return boxes.get(0);
        } else {
            throw new RuntimeException("No HeijunkaBox found");
        }
    }
}
