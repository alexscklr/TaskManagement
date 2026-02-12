using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // --- Task Mappings ---
        // MemberList.Source sagt: Ignoriere alles im Model, was nicht im Dto steht
        CreateMap<TaskCreateDto, TodoTask>(MemberList.Source);

        CreateMap<TaskUpdateDto, TodoTask>(MemberList.Source)
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<TodoTask, TodoTaskReadDto>();

        // --- Category Mappings ---
        CreateMap<CategoryCreateDto, Category>(MemberList.Source);

        CreateMap<CategoryUpdateDto, Category>(MemberList.Source)
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Category, CategoryReadDto>();

        // --- Workspace Mappings ---
        CreateMap<WorkspaceCreateDto, Workspace>(MemberList.Source);

        CreateMap<WorkspaceUpdateDto, Workspace>(MemberList.Source)
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Workspace, WorkspaceReadDto>();

        // --- User Mappings ---

        // Create: Password im DTO wird nicht direkt gemappt
        CreateMap<UserCreateDto, User>(MemberList.Source)
            .ForSourceMember(src => src.Password, opt => opt.DoNotValidate())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());

        // Update: NewPassword im DTO wird nicht direkt gemappt
        CreateMap<UserUpdateDto, User>(MemberList.Source)
            .ForSourceMember(src => src.NewPassword, opt => opt.DoNotValidate())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<User, UserReadDto>();

        // --- WorkspaceMembership Mappings ---
        CreateMap<WorkspaceMembershipCreateDto, WorkspaceMembership>(MemberList.Source);

        CreateMap<WorkspaceMembershipUpdateDto, WorkspaceMembership>(MemberList.Source)
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<WorkspaceMembership, WorkspaceMembershipInvitationReadDto>()
            .ForMember(dest => dest.Workspace, opt => opt.MapFrom(src => src.Workspace));

        CreateMap<WorkspaceMembership, WorkspaceMembershipReadDto>();
    }
}
