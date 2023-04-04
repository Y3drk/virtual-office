package pl.agh.virtualoffice.backend.openAI;

import org.springframework.data.web.JsonPath;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Component
public class OpenAiProvider
{
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    private final String apiKey = System.getenv("OPENAI_API_KEY");
    private final RestTemplate restTemplate = new RestTemplate();

    public String generateTag(String content)
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        content = content.replaceAll("[\".]", "");
        String instruction  = content.concat( " From the list of tags choose one that describes the chat between two coworkers best. List of tags: [food, money, work, hobby] Your response must be only one word");
        String requestJson = "{\"model\":" + "\"gpt-3.5-turbo\"" + ",\"messages\":[{\"role\":\"user\",\"content\":\"" + instruction + "\"}]}";

        HttpEntity<String> request = new HttpEntity<>(requestJson, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, request, String.class);
        String responseBody = response.getBody();

        if (responseBody.contains("work")) return "work";
        else if (responseBody.contains("food")) return "food";
        else if (responseBody.contains("money")) return "money";
        else if (responseBody.contains("hobby")) return "hobby";
        return "other";
    }
}