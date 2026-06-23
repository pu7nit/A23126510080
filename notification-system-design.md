# Notification System Design

# Stage 1: Priority Inbox Logic

Approach and Priority Logic
To determine the "most important" notifications, we establish a composite priority metric based on two factors:
1. **Weight (Primary):** Categorical importance mapped to integer values: `Placement` (3) > `Result` (2) > `Event` (1).
2. **Recency (Secondary):** Chronological order parsed from the `Timestamp`. Newer timestamps take precedence if weights are tied.