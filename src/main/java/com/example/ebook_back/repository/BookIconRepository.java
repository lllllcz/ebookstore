package com.example.ebook_back.repository;

import com.example.ebook_back.entity.BookIcon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(collectionResourceRel = "bookicon", path = "bookicon")
public interface BookIconRepository extends MongoRepository<BookIcon, Integer> {

}
