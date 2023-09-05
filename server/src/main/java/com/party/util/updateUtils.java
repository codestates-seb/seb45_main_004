package com.party.util;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Collection;

// source에는 Dto 기반의 엔티티 객체 destination에는 DB에서 찾은 엔티티 객체
@Component
public class updateUtils<T> {
    public T copyNonNullProperties(T source, T destination) {
     if(source == null || destination == null || source.getClass() != destination.getClass());

     final BeanWrapper src = new BeanWrapperImpl(source);
     final BeanWrapper dest = new BeanWrapperImpl(destination);

     for(final Field property: source.getClass().getDeclaredFields()) {
         Object sourceProperty = src.getPropertyValue(property.getName());
         if(sourceProperty != null && !(sourceProperty instanceof  Collection<?>)) {

             dest.setPropertyValue(property.getName(), sourceProperty);
         }
     }

     return destination;
    }
}
