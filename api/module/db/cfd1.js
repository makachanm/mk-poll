export const InsertNewPoll = async (pollid, candnum, originurl, polltime, polled) => {
   try {
      await env.PollDB.prepare(`INSERT INTO PollHistory(PollID, CandidateNumber, OriginPost, PollTime) VALUES (?1, ?2, ?3, ?4)`)
                      .bind(pollid, candnum, originurl, polltime).run();

      const pat_prepare = env.PollDB.prepare(`INSERT INTO PollParti(MemberName, OriginID) VALUES (?1, ?2)`)
      for(const pctx in polled){
         await pat_prepare.bind(pctx, pollid).run()
      }

   } catch (e) {
      return null
   }
}   

export const GetPollHistory = async (pollid) => {
   let data = {
      candidate_number: 0,
      origin_url: "",
      polltime: 0,
      candidates: [],
   }

   try {
      const hispr = await env.PollDB.prepare(`SELECT CandidateNumber, OriginPost, PollTime FROM PollHistory WHERE PollID = ?1`).bind(pollid);
      const history_result = await hispr.raw();

      data.candidate_number = history_result[0]
      data.origin_url = history_result[1]
      data.polltime = history_result[2]

      const cadpr = await env.PollDB.prepare(`SELECT MemberName FROM PollParti WHERE OriginID = ?1`).bind(pollid);
      const caddi_result = await cadpr.raw();

      caddi_result.forEach(cadrow => {
         data.candidates.push(cadrow[0])
      });

      return data      
   } catch {
      return null
   }
}