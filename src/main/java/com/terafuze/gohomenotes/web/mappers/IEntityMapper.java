package com.terafuze.gohomenotes.web.mappers;

import java.util.List;

/**
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - Model type parameter.
 * @param <E> - Entity type parameter.
 */

public interface IEntityMapper <D, E> {

    E toEntity(D dto);

    D toModel(E entity);

    List <E> toEntity(List<D> dtoList);

    List <D> toModel(List<E> entityList);
}
