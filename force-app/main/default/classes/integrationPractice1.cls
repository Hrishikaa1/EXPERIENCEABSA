public class integrationPractice1 {
 
    public static void getBranchType(String pincode) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.postalpincode.in/pincode/' + pincode);
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            List<Object> outerList = (List<Object>) JSON.deserializeUntyped(res.getBody());
          
                Map<String, Object> firstObj = (Map<String, Object>) outerList[0];

                List<Object> postOffices = (List<Object>) firstObj.get('PostOffice');
                               //     Map<String, Object> postOfficeMap = (Map<String, Object>)postOffices[1];
//String cityName=(String)postOfficeMap.get('Name');
//System.debug('city ANme'+cityName);
                if (postOffices != null) {
                    for (Object po : postOffices) {
                        Map<String, Object> postOfficeMap = (Map<String, Object>) po;
                        System.debug('BranchType =====> ' + (String) postOfficeMap.get('BranchType'));
                        System.debug('Circle =====> ' + (String) postOfficeMap.get('Circle'));
                        System.debug('Block =====> ' + (String) postOfficeMap.get('Block'));
                        System.debug('DeliveryStatus =====> ' + (String) postOfficeMap.get('DeliveryStatus'));
                        System.debug('District =====> ' + (String) postOfficeMap.get('District'));
                    }
                }
            }
    }
    
    
    public static void getmethod1(String pincode) {
      Http h= new Http();
    HttpRequest request = new HttpRequest();
    request.setEndPoint('https://api.postalpincode.in/pincode/'+pincode);
     request.setMethod('GET');
    HttpResponse response = h.send(request);
        List<WapperPlaces> res =(List<WapperPlaces>)JSON.deserialize(response.getBody(),List<WapperPlaces>.class);
       System.debug(res);
        for(WapperPlaces wp:res){
            System.debug('Message:'+wp.Message);
            System.debug('Status:'+wp.Status);
            if(wp.PostOffice!=null){
                for(Address addr :wp.PostOffice){
                    System.debug('Name:'+addr.name);
                    System.debug('description:'+addr.Description);
                    System.debug('BranchType:'+addr.BranchType);
                    System.debug('Branch:'+addr.BranchType);
                    System.debug('Delivery status:'+addr.DeliveryStatus);
                    System.debug('circle:'+addr.Circle);
                    System.debug('District:'+addr.District);
                    System.debug('Divison'+addr.Division);
                    System.debug('region:'+addr.Region);
                    System.debug('Block'+addr.Block);
                    System.debug('State:'+addr.State);
                    System.debug('Country:'+addr.Country);
                    System.debug('pincode:'+addr.Pincode);
                }
            }
        }
    }
    public class WapperPlaces{
        public string Message;
        public string Status;
        public list<Address> PostOffice;
    }
        public class Address{
           public string Name;
                 public string Description;
                public string BranchType;
                public string DeliveryStatus;
                public string Circle;
                public string District;
                 public string Division;
                 public string Region;
                 public string Block;
                public string State;
                public string Country;
                public string Pincode;

}
}