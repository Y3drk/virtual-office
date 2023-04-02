package pl.agh.virtualoffice.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.agh.virtualoffice.backend.openAI.OpenAiProvider;

@RestController
public class OpenAiController
{

    private final OpenAiProvider openAi;

    @Autowired
    public OpenAiController(OpenAiProvider openAi)
    {
        this.openAi = openAi;
    }

    @PostMapping("/generateTag")
    public String generateTag(@RequestBody String content)
    {
        return openAi.generateTag(content);
    }
}
