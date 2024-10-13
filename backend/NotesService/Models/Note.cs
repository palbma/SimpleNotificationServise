namespace NotesService.Models
{
    public class Note
    {
        public Guid Id { get; set; }

        public string Title { get; init; } = string.Empty;

        public string Description { get; init; } = string.Empty;

        public DateTime CreatedAt { get; init; }

        public Note( string title, string description)
        {
            Title = title;
            Description = description;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
