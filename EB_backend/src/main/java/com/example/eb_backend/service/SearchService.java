package com.example.eb_backend.service;

import org.apache.solr.client.solrj.SolrServerException;

import java.io.IOException;

public interface SearchService {
    String addAll() throws SolrServerException, IOException;

    String searchBookName(String keyword) throws SolrServerException, IOException;
}
