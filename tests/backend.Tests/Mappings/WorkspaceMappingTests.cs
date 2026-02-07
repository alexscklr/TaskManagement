using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Profiles;
using FluentAssertions;

namespace backend.Tests.Mappings;

public class WorkspaceMappingTests
{
    private readonly IMapper _mapper;

    public WorkspaceMappingTests()
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
    public void Workspace_To_WorkspaceReadDto_ShouldMapAllFields()
    {
        //Arrange
        var workspace = new Workspace { Id = 1, Name = "Test Workspace" };

        var dto = _mapper.Map<WorkspaceReadDto>(workspace);

        dto.Id.Should().Be(workspace.Id);
        dto.Name.Should().Be(workspace.Name);
    }

    [Fact]
    public void WorkspaceCreateDto_To_Workspace_ShouldIgnoreId()
    {
        var dto = new WorkspaceCreateDto { Name = "New Workspace" };

        var model = _mapper.Map<Workspace>(dto);

        model.Name.Should().Be(dto.Name);
        model.Id.Should().Be(0);
    }

    [Fact]
    public void WorkspaceUpdateDto_To_Workspace_ShouldMapUpdateFields()
    {
        var dto = new WorkspaceUpdateDto { Name = "Updated Workspace" };

        var model = _mapper.Map<Workspace>(dto);

        model.Name.Should().Be(dto.Name);
    }
}
