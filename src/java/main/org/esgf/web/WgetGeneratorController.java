package org.esgf.web;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.esgf.metadata.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import org.apache.log4j.Logger;
/**
 * Implementation of a controller that generates wget scripts on the fly.  A request is sent from the front end to generate this script.  
 * Contained in its query string are the following parameters:
 * - id name of the dataset
 * - array of the individual file names contained in the batch of files requested for download
 * - a 'create' or 'delete' query variable (in lieu of http PUT and DELETE) 
 * 
 * 
 * @author john.harney
 *
 */
@Controller
@RequestMapping("/wgetproxy")
public class WgetGeneratorController {

    private final static Logger LOG = Logger.getLogger(WgetGeneratorController.class);
    
        //
        //The wget file is primarily created through the post method
        @RequestMapping(method=RequestMethod.GET)
        public @ResponseBody void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, JSONException, ParserConfigurationException {
            LOG.debug("doGet wgetproxy");
            createWGET(request, response);
        }
        
        
        @RequestMapping(method=RequestMethod.POST)
        public @ResponseBody void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, JSONException, ParserConfigurationException {
            LOG.debug("doPost wgetproxy");
            
            if(request.getParameter("type").equals("create")) {
                createWGET(request, response);
            }
        }
        
        
        private void createWGET(HttpServletRequest request, HttpServletResponse response) throws IOException, JSONException, ParserConfigurationException {
            
            
         // file name
            String filename = request.getParameter("id") + ".sh";

            LOG.debug("filename = " + filename);
            // create content

            String wgetText = "#!/bin/sh\n";

            wgetText += "# ESG Federation download script\n";
            wgetText += "#\n";
            wgetText += "# Template version: 0.2\n";
            wgetText += "# Generated by the all new ESGF Gateway\n";
            wgetText += "#";
            wgetText += "##############################################################################\n\n\n";

            wgetText += "download() {\n";

            for(int i=0;i<request.getParameterValues("child_url").length;i++) {
            wgetText += "\twget '" + request.getParameterValues("child_url")[i] + "'\n";
            }

            wgetText += "}\n";
            wgetText += "#\n# MAIN \n#\n";
            wgetText += "download\n";



            response.setContentType("text/x-sh");
            response.addHeader("Content-Disposition", "attachment; filename=" + filename );
            response.setContentLength((int) wgetText.length());
            PrintWriter out = response.getWriter();
            out.print(wgetText);

            LOG.debug("Finishing writing wget stream");
        
            
        }
        
        
        
        private void queryStringInfo(HttpServletRequest request) {
            LOG.debug("Query parameters");
            LOG.debug("\tId");
            LOG.debug("\t\t" + request.getParameterValues("id")[0]);
            LOG.debug("\tType");
            LOG.debug("\t\t" + request.getParameterValues("type")[0]);
            LOG.debug("\tChild urls");
            for(int i=0;i<request.getParameterValues("child_url").length;i++) {
                LOG.debug("\t\t" + request.getParameterValues("child_url")[i]);
            }
            LOG.debug("\tChild ids");
            for(int i=0;i<request.getParameterValues("child_id").length;i++) {
                LOG.debug("\t\t" + request.getParameterValues("child_id")[i]);
            }
        }
    
}