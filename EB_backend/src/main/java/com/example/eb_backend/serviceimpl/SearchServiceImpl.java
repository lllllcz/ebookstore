package com.example.eb_backend.serviceimpl;

import com.example.eb_backend.dao.BookDao;
import com.example.eb_backend.entity.Book;
import com.example.eb_backend.service.SearchService;
import com.example.eb_backend.utils.MessageUtil;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.common.params.MapSolrParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SearchServiceImpl implements SearchService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private SolrClient solrClient;

    @Autowired
    private BookDao bookDao;

    @Override
    public String addAll() throws SolrServerException, IOException {

        List<Book> books = bookDao.getAllBooks();
        for (Book book : books) {
            SolrInputDocument doc = new SolrInputDocument();

            doc.addField("id", book.getBookId());
            doc.addField("name", book.getBookName());
            doc.addField("author", book.getAuthor());
            doc.addField("des", book.getBookDescription());

            solrClient.add(doc);
        }
        solrClient.commit();

        return MessageUtil.message(0, "add-all", null);
    }

    @Override
    public String searchBookName(String keyword) throws SolrServerException, IOException {
        final Map<String, String> queryParamMap = new HashMap<>();
        queryParamMap.put("q", "name:"+keyword);
        queryParamMap.put("fl", "id, name, author, des");
        queryParamMap.put("sort", "id asc");
        MapSolrParams queryParams = new MapSolrParams(queryParamMap);

        final QueryResponse response = solrClient.query(queryParams);
        final SolrDocumentList documents = response.getResults();

        System.out.println("Found " + documents.getNumFound() + " documents");

        List<String> idList = new ArrayList<>();

        for (SolrDocument document : documents) {
            idList.add((String) document.getFirstValue("id"));

            final String name = (String) document.getFirstValue("name");
            System.out.println("\tname: " + name);
        }

        String msg = "找到 " + documents.getNumFound() + " 本书";
        return MessageUtil.message(0, msg, idList);
    }

}
