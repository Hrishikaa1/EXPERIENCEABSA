public with sharing class integrationPractice {
   

    public static void getBranchTypes(String pincode) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.postalpincode.in/pincode/' + pincode);
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            // Deserialize the top-level list (the response starts with [ ... ])
            List<Object> outerList = (List<Object>) JSON.deserializeUntyped(res.getBody());
            if (!outerList.isEmpty()) {
                Map<String, Object> firstObj = (Map<String, Object>) outerList[0];

                // Get PostOffice list from the map
                List<Object> postOffices = (List<Object>) firstObj.get('PostOffice');

                if (postOffices != null) {
                    for (Object po : postOffices) {
                        Map<String, Object> postOfficeMap = (Map<String, Object>) po;
                        System.debug('BranchType ➜ ' + (String) postOfficeMap.get('BranchType'));
                    }
                } else {
                    System.debug('No PostOffice data found.');
                }
            }
        } else {
            System.debug('Error: ' + res.getStatus());
        }
    }
}