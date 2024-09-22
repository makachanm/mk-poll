DROP Table IF EXISTS PollHistory;
DROP Table IF EXISTS PollParti;

CREATE Table IF NOT EXISTS PollHistory (
   PollID TEXT PRIMARY KEY NOT NULL,
   CandidateNumber INTEGER NOT NULL,
   PollTime INTEGER,
   OriginPost TEXT NOT NULL
);

CREATE Table IF NOT EXISTS PollParti (
   PartiID INTEGER PRIMARY KEY,
   MemberName TEXT NOT NULL,
   OriginID TEXT,
   FOREIGN KEY(OriginID) REFERENCES PollHistory(PollID)
);