package org.esgf.datacart;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class DocElementTest {
    //test runner
    public static void main(String [] args) {
        
        
        System.out.println("Running test for DocElementTest");
        Result result = JUnitCore.runClasses(DocElementTest.class);
        
        for (Failure failure : result.getFailures()) {
            System.out.println(failure.toString());
        }
        System.out.println("Total Tests: " + result.getRunCount());
        System.out.println("Failure count: " + result.getFailureCount());
         
    }
    
    /*
     * Test Cases to be conducted (grouped by method name)
     * 
     * toElement()
     * 
     * toXML()
     * 
     * toJSONObject()
     * 
     * toJSON()
     * 
     * toFile()
     * 
     * fromFile()
     * 
     * readHelper()
     * 
     * addFile()
     * 
     * removeFile()
     * 
     * 
     * 
     */
    
    
    
    @Test
    public void testInitialization() {
        int a = 0;
        
        assertEquals(a,0);
        
    }
    
}
