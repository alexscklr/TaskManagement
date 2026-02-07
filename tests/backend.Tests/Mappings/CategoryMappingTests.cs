using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Profiles;
using FluentAssertions;

namespace backend.Tests.Mappings;

public class CategoryMappingTests
{
    private readonly IMapper _mapper;

    public CategoryMappingTests()
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
    public void Category_To_CategoryReadDto_ShouldMapAllFields()
    {
        //Arrange
        var category = new Category
        {
            Id = 1,
            Name = "Test Category",
            Color = "#FFFFFF",
        };

        var dto = _mapper.Map<CategoryReadDto>(category);

        dto.Id.Should().Be(category.Id);
        dto.Name.Should().Be(category.Name);
        dto.Color.Should().Be(category.Color);
    }

    [Fact]
    public void CategoryCreateDto_To_Category_ShouldIgnoreId()
    {
        var dto = new CategoryCreateDto { Name = "New Category", Color = "#000000" };

        var model = _mapper.Map<Category>(dto);

        model.Name.Should().Be(dto.Name);
        model.Id.Should().Be(0);
    }

    [Fact]
    public void CategoryUpdateDto_To_Category_ShouldMapUpdateFields()
    {
        var dto = new CategoryUpdateDto { Name = "Updated Category", Color = "#123456" };

        var model = _mapper.Map<Category>(dto);

        model.Name.Should().Be(dto.Name);
        model.Color.Should().Be(dto.Color);
    }
}
