const getHistory = async (req) => {
   if (req.headers.get('Content-Type') !== "application/json"){
     return new Response('invalid content type: must use application/json.', { status: 405 })
  }

   const RespData = {
       "polled": results,
       "candidate_nums": candidate_total
   }

   return new Response(JSON.stringify(RespData), { headers: { 'Content-Type': "application/json" } })
}

export default getHistory