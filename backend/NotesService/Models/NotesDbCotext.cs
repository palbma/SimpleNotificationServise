using Microsoft.EntityFrameworkCore;

namespace NotesService.Models
{
    public class NotesDbCotext : DbContext
    {
      
        public NotesDbCotext(DbContextOptions<NotesDbCotext> options) : base(options) { }
        public DbSet<Note> Notes => Set<Note>();
    }
}
