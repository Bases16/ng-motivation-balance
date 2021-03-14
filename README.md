# Motivation Balance

---

A web-application for organizations to collect their employees' attitudes on any factors (as for example playstation, free coffee, scrum etc).

---

### Functionality
There is a **survey** with relevant factors and employees should take this survey to express their attitude on the factors.  
There are 3 options to choose on each factor: **LIKE, NEUTRAL and DISLIKE.**  
These estimations have their numeric equivalent: +1, 0 and -1 respectively.  
**All estimations are summed up and form a total balance**. With that we can see current motivation balance of an employee.

#### There are 3 types of users: ADMIN, MANAGER and SPECIALIST.
- **SPECIALIST** is able to take the survey and see history of own survey results.
- **MANAGER** as an employee is able to take the survey as well and also see results of employees related to this manager.
- **ADMIN**  is able to add/remove current factors, turn a specialist into a manager and vice-versa, assign employees to a particular manager, see all results, see overall statistic etc.
---

### Technology stack
* Spring 5 **([link to a backend repo](https://github.com/Bases16/motivation-balance))**
* Angular 11
* Spring-Security
* JPA (Hibernate)
* JTA (Atomikos)
* PostgreSQL
* JUnit 4
* Maven

* JTA (Atomikos)
* PostgreSQL
* JUnit 4
* Maven  
