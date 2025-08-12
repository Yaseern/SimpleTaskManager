using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Core.Models.Task;
using TaskManagerAPI.Core.Services.Task;

namespace TaskManagerAPI.Minimal.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class TaskController(ITaskService taskService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await taskService.GetAll();
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var task = await taskService.GetById(id);
            if (task is null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TaskItemDto taskItem)
        {
            var newTask = await taskService.CreateTask(taskItem);

            return CreatedAtAction(nameof(Get), new { id = newTask!.Id }, newTask);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TaskItemDto updated)
        {
            var isValid = await taskService.UpdateTask(id, updated);
            if (!isValid)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isValid = await taskService.RemoveTask(id);
            if (!isValid)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
