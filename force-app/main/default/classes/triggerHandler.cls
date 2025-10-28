public class triggerHandler {
/*  When a new Contact is created, copy the parent Account’s BillingCity into Contact.MailingCity. */
    
    public static void TriggerHandlerContact(List<Contact>ConList){
        Map<id,List<Contact>>MApIdVsConts = new Map<id,List<Contact>>();
        List<Contact>ConLi =[Select AccountId,id,NAme,Account.BillingCity from Contact where AccountId != null];
        for(Contact con: conList){
           con.mailingCity = con.Account.BillingCity;
        }
    }
public static void addDaysCreateOpportunity(List<Opportunity> oppList, Map<Id, Opportunity> oldMap) {
    List<Task> taskList = new List<Task>();

    for (Opportunity opNew : oppList) {
        if (opNew.Amount <= 10000 && !oldMap.containsKey(opNew.Id)) {
            Task t = new Task();
            t.Subject = 'New Task';
            t.Description = 'Due date === ' + Date.today().addDays(1);
            t.WhatId = opNew.Id;
            t.Status = 'Not Started';
            t.Priority = 'Normal';
            taskList.add(t);
        }
    }

    for (Id opId : oldMap.keySet()) {
        Opportunity oldOp = oldMap.get(opId);
        Opportunity newOp;

        for (Opportunity o : oppList) {
            if (o.Id == opId) {
                newOp = o;
                break;
            }
        }

        if (newOp != null && oldOp.Amount <= 10000 && oldOp.Amount != newOp.Amount) {
            Task t = new Task();
            t.Subject = 'Updated Task';
            t.Description = 'Due date === ' + Date.today().addDays(1);
            t.WhatId = newOp.Id;
            t.Status = 'Not Started';
            t.Priority = 'Normal';
            taskList.add(t);
        }
    }

    if (!taskList.isEmpty()) {
        insert taskList;
    }
}

        
    }