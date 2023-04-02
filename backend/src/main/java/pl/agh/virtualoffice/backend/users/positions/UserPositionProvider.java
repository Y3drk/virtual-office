package pl.agh.virtualoffice.backend.users.positions;

import org.springframework.stereotype.Component;
import pl.agh.virtualoffice.backend.util.Position;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
public class UserPositionProvider {

    private final ConcurrentMap<Integer, Position> userPositionById = new ConcurrentHashMap<>();

    public void updateUserPosition(int id, Position newPosition) {
        userPositionById.put(id, newPosition);
    }

    public Map<Integer, Position> getAllUsersPositions() {
        return userPositionById;
    }
}
