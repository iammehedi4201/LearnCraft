Hey, I want to build a new feature in Antigravity IDE for managing lesson content improvements.

With this feature, a user should be able to paste improved lesson content into the IDE. The system should then automatically analyze the content and detect:

Which topic the improvement belongs to
Which lesson it belongs to
Which section of that lesson should be updated

After detecting the correct location, the system should show a preview of the proposed changes before modifying the existing lesson.

The user should be able to compare the current content with the improved content and then choose to Confirm or Cancel the update.

Once the user confirms the change, the system should update the appropriate section of the lesson automatically.

The feature should also support version history and undo functionality. Users should be able to:

See a history of all improvements made to a lesson
See what was changed in each update
View the previous version of the lesson
Compare the previous and updated versions
Undo a specific improvement
Restore a previous version if necessary

The overall workflow should be:

Paste Improvement → Detect Topic → Detect Lesson → Detect Section → Preview Changes → User Confirmation → Update Lesson → Save Version History

The goal is to make improving existing learning content fast, safe, and easy, while ensuring that no lesson content is changed without the user's confirmation.