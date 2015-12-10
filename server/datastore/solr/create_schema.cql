
CREATE KEYSPACE elll WITH REPLICATION = {
                                            'class': "NetworkTopologyStrategy", 
                                            'Solr': 1
                                        } AND durable_writes = true;

USE elll;

CREATE TYPE emergencycontact {
                                mobile double
                             };

CREATE TYPE history {
                        latlong text, 
                        timestamp timestamp
                    };

CREATE TYPE acceptorrejector {
                                mobile double, 
                                timestamp timestamp
                             };

CREATE TYPE sos {
                    requestid text, 
                    timestamp timestamp, 
                    latlong text, 
                    status text, 
                    acceptors list<FROZEN<acceptorrejector>>, 
                    rejectors list<FROZEN<acceptorrejector>>
                };

CREATE TABLE user { 
                    id text, 
                    mobile double, 
                    name text, 
                    email text, 
                    token text, 
                    latlong text, 
                    emergencycontacts list<FROZEN<emergencycontact>>, 
                    history FROZEN<history>, 
                    sos FROZEN<sos>
                  };

