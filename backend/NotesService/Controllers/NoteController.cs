using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesService.Contracts;
using NotesService.Models;
using System.Linq.Expressions;

namespace NotesService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        private readonly NotesDbCotext _dbContext;
        public NoteController(NotesDbCotext dbContext)
        {
            _dbContext = dbContext;
        }
        //[HttpGet]
        //public IActionResult NoteIndex()
        //{
        //    return View();
        //}
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
        {
            var note = new Note(request.Title,request.Description);
            await _dbContext.Notes.AddAsync(note);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
        {
            var notesQuery = _dbContext.Notes.Where(n => string.IsNullOrWhiteSpace(request.Search) || n.Title.ToLower().Contains(request.Search.ToLower()));
            Expression<Func<Note, object>> selectorKey;
            switch (request.SortItem?.ToLower())
            {
                case "date":
                    selectorKey = note => note.CreatedAt;
                    break;
                case "title":
                    selectorKey = note => note.Title;
                    break;
                default:
                    selectorKey = note => note.Id;
                    break;
            }
            switch (request.SortOrder)
            {
                case "desc":
                    notesQuery = notesQuery.OrderByDescending(selectorKey);
                    break;
                default:
                    notesQuery = notesQuery.OrderBy(selectorKey);
                    break;
            }
            var notes = await notesQuery.ToListAsync(cancellationToken: ct);
            if (!notes.Any())
            {
                return NotFound("No notes found.");
            }
            var noteDtos = await notesQuery.Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt)).ToListAsync(cancellationToken: ct);
            return Ok(new GetNotesRespone(noteDtos));
        }
        //[HttpGet]
        //public async Task<IActionResult> Get1(CancellationToken ct)
        //{
        //    var notes = await _dbContext.Notes.ToListAsync(cancellationToken: ct);
        //    var noteDtos = notes.Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt)).ToList();
        //    return Ok(new GetNotesRespone(noteDtos));
        //}
        //private Expression<Func<Note,object>> GetSelectorKey(string sortItem)
        //{

        //}
    }
}
