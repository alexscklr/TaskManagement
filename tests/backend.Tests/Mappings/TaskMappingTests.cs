using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Profiles;
using FluentAssertions;

namespace backend.Tests.Mappings;

public class TaskMappingTests
{
    private readonly IMapper _mapper;

    public TaskMappingTests()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });

        _mapper = config.CreateMapper();
    }

    [Fact]
    public void Configuration_ShouldBeValid()
    {
        var config = new MapperConfiguration(config => config.AddProfile<MappingProfile>());
        config.AssertConfigurationIsValid();
    }

    [Fact]
    public void Task_To_TaskReadDto_ShouldMapAllFields()
    {
        //Arrange
        var task = new TodoTask
        {
            Id = 1,
            Title = "Test Task",
            Description = "This is a test task",
            IsCompleted = false,
        };

        var dto = _mapper.Map<TodoTaskReadDto>(task);

        dto.Id.Should().Be(task.Id);
        dto.Title.Should().Be(task.Title);
        dto.Description.Should().Be(task.Description);
        dto.IsCompleted.Should().Be(task.IsCompleted);
    }

    [Fact]
    public void TaskCreateDto_To_Task_ShouldIgnoreId()
    {
        var dto = new TaskCreateDto { Title = "New Task", Description = "Task Description" };

        var model = _mapper.Map<TodoTask>(dto);

        model.Title.Should().Be(dto.Title);
        model.Id.Should().Be(0);
    }

    [Fact]
    public void TaskUpdateDto_To_Task_ShouldMapUpdateFields()
    {
        var dto = new TaskUpdateDto
        {
            Title = "Updated Task",
            Description = "Updated Description",
            IsCompleted = true,
        };

        var model = _mapper.Map<TodoTask>(dto);

        model.Title.Should().Be(dto.Title);
        model.Description.Should().Be(dto.Description);
        model.IsCompleted.Should().Be(dto.IsCompleted);
    }
}
