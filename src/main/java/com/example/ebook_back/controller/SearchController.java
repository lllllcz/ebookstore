package com.example.ebook_back.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.service.BookService;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.common.params.MapSolrParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/book")
public class SearchController {

    @Autowired
    private SolrClient solrClient;

    @Autowired
    private BookService bookService;

    @GetMapping("/search/add")
    public String add() throws SolrServerException, IOException {

        ArrayList<Book> books = bookService.getAllBooks();
        for (Book book : books) {
            SolrInputDocument doc = new SolrInputDocument();

            doc.addField("id", book.getBookId());
            doc.addField("name", book.getBookName());
            doc.addField("author", book.getAuthor());
            doc.addField("des", book.getBookDescription());

            solrClient.add(doc);
        }
        solrClient.commit();

        return "add";
    }

    @GetMapping("/search")
    public String search(@RequestParam("keyword") String keyword) throws SolrServerException, IOException {
        final Map<String, String> queryParamMap = new HashMap<String, String>();
        queryParamMap.put("q", "des:"+keyword);
        queryParamMap.put("fl", "id, name, author, des");
        queryParamMap.put("sort", "id asc");
        MapSolrParams queryParams = new MapSolrParams(queryParamMap);

        final QueryResponse response = solrClient.query(queryParams);
        final SolrDocumentList documents = response.getResults();

        System.out.println("Found " + documents.getNumFound() + " documents");

        JSONObject object = new JSONObject();
        object.put("num", documents.getNumFound());

        List<Integer> idList = new ArrayList<>();
        List<String> nameList = new ArrayList<>();

        for (SolrDocument document : documents) {
            final String name = (String) document.getFirstValue("name");
            final String author = (String) document.getFirstValue("author");
            final String des = (String) document.getFirstValue("des");

            idList.add((Integer) document.getFirstValue("id"));
            nameList.add(name);

            System.out.print("->");
            System.out.println("\tname: " + name);
            System.out.println("\tauthor: " + author);
            System.out.println("\tdes: " + des);
        }

        object.put("bookIds", idList);
        object.put("bookNames", nameList);
        return object.toJSONString();
    }

}
