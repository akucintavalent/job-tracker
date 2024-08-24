export interface IMapper<TDto, TEntity> {
  toDto(entity: TEntity): TDto;
  toEntity(dto: TDto): TEntity;
}
