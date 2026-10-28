package devsarthi.backend.services.ai;
import devsarthi.backend.dto.CitationDto;
import java.util.List;

public record RetrievedContext(
        List<CitationDto> citations,
        String contextText) {
}