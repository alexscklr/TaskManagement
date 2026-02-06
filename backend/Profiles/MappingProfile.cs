using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Task Mappings
        CreateMap<TaskCreateDto, TodoTask>();
        CreateMap<TaskUpdateDto, TodoTask>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<TodoTask, TodoTaskReadDto>();

        // Category Mappings
        CreateMap<CategoryCreateDto, Category>();
        CreateMap<CategoryUpdateDto, Category>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Category, CategoryReadDto>();

        // Workspace Mappings
        CreateMap<WorkspaceCreateDto, Workspace>();
        CreateMap<WorkspaceUpdateDto, Workspace>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Workspace, WorkspaceReadDto>();
    }
}
