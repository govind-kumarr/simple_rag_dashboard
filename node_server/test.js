// fetch("https://api.vectara.io:443/v1/stream-query", {
//   headers: {
//     "Content-Type": "application/json",
//     authorization:
//       "Bearer eyJraWQiOiJvUnVNVmNrXC9DRFN2R2RDa2ViVEc2SVIwM0NCbmtlbnRISjFkNGFEZUZpUT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiYjF6U2pQSlExa3JfUHZ3WDMtYmYxdyIsInN1YiI6ImZmNjVlMjZmLTdhMzQtNDAwYS1hZmE0LTEyMWE4ZDgwMmE3OSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLXdlc3QtMl9KMFZqQnd6b1dfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9KMFZqQnd6b1ciLCJjb2duaXRvOnVzZXJuYW1lIjoiR29vZ2xlXzExODMxNjY3NTQwNjMxODk0NjM1MCIsImdpdmVuX25hbWUiOiJHb3ZpbmQiLCJvcmlnaW5fanRpIjoiZTcwOGJjM2EtOGFhYi00ZjExLWEwZTMtNTMxZTAzYzczMmNlIiwiYXVkIjoiNXVrZjZ2OW45Yjdtb3ByZW1ocDI5YzJzdG8iLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMTgzMTY2NzU0MDYzMTg5NDYzNTAiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNzEwNzgyNjc4Njk1In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxMDc4MjY4MSwibmFtZSI6IkdvdmluZCBLdW1hciIsImV4cCI6MTcxMzI4MTc1OCwiaWF0IjoxNzEzMjc4MTU4LCJmYW1pbHlfbmFtZSI6Ikt1bWFyIiwianRpIjoiMjFiOTViMTAtMDY4Yi00NWQ1LTkwMzktNDY5MGQxNWY0YjcxIiwiZW1haWwiOiJnazQwNTE2NjhAZ21haWwuY29tIn0.AIqG8oZ4Y0XOAL2UArOqzb0ZjDFhBM5MsWRtr9HGM2YT0dU8P3Va3AoTH-mHw5qKPQhUHzd_latppLnrhKsG-xG80oRDfVT80vVgWJZicBBv8zSJTJu9DlUY71scjGp6LOOwOH0hVtOAgHIiyHjo3YCnemt4f29T_p-ID_B13caK__l1mn22cSGyhf2NDVUtu9D_RDl8vqzvZUh4fP6gnNfTNYPS7remvBBAzs-foypmKx6vTSvo_HNmjb9EV-EhG158iUTfPLJxmR4prFzrywryGyWBhLQObaarO6XYA_fykz9QNDcu3o2M3iAx7wQlLsJMtRNQJr7jAvRPIysmrQ",
//     "customer-id": "1254557155",
//   },
//   body: '{"query":[{"query":"what is langchain ?","queryContext":"","start":0,"numResults":10,"contextConfig":{"charsBefore":0,"charsAfter":0,"sentencesBefore":2,"sentencesAfter":2,"startTag":"%START_SNIPPET%","endTag":"%END_SNIPPET%"},"corpusKey":[{"customerId":1254557155,"corpusId":6,"semantics":0,"metadataFilter":"","lexicalInterpolationConfig":{"lambda":0.025},"dim":[]}],"summary":[{"debug":false,"chat":{"store":true,"conversationId":""},"maxSummarizedResults":5,"responseLang":"eng","summarizerPromptName":"vectara-summary-ext-v1.2.0","factualConsistencyScore":true}]}]}',
//   method: "post",
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// to use this install node-fetch from npm using 'npm install node-fetch --save'
fetch("https://api.vectara.io:443/v1/query", {
  headers: {
    "Content-Type": "application/json",
    authorization:
      "Bearer eyJraWQiOiJvUnVNVmNrXC9DRFN2R2RDa2ViVEc2SVIwM0NCbmtlbnRISjFkNGFEZUZpUT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiYjF6U2pQSlExa3JfUHZ3WDMtYmYxdyIsInN1YiI6ImZmNjVlMjZmLTdhMzQtNDAwYS1hZmE0LTEyMWE4ZDgwMmE3OSIsImNvZ25pdG86Z3JvdXBzIjpbInVzLXdlc3QtMl9KMFZqQnd6b1dfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9KMFZqQnd6b1ciLCJjb2duaXRvOnVzZXJuYW1lIjoiR29vZ2xlXzExODMxNjY3NTQwNjMxODk0NjM1MCIsImdpdmVuX25hbWUiOiJHb3ZpbmQiLCJvcmlnaW5fanRpIjoiZTcwOGJjM2EtOGFhYi00ZjExLWEwZTMtNTMxZTAzYzczMmNlIiwiYXVkIjoiNXVrZjZ2OW45Yjdtb3ByZW1ocDI5YzJzdG8iLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMTgzMTY2NzU0MDYzMTg5NDYzNTAiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNzEwNzgyNjc4Njk1In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxMDc4MjY4MSwibmFtZSI6IkdvdmluZCBLdW1hciIsImV4cCI6MTcxMzI4MTc1OCwiaWF0IjoxNzEzMjc4MTU4LCJmYW1pbHlfbmFtZSI6Ikt1bWFyIiwianRpIjoiMjFiOTViMTAtMDY4Yi00NWQ1LTkwMzktNDY5MGQxNWY0YjcxIiwiZW1haWwiOiJnazQwNTE2NjhAZ21haWwuY29tIn0.AIqG8oZ4Y0XOAL2UArOqzb0ZjDFhBM5MsWRtr9HGM2YT0dU8P3Va3AoTH-mHw5qKPQhUHzd_latppLnrhKsG-xG80oRDfVT80vVgWJZicBBv8zSJTJu9DlUY71scjGp6LOOwOH0hVtOAgHIiyHjo3YCnemt4f29T_p-ID_B13caK__l1mn22cSGyhf2NDVUtu9D_RDl8vqzvZUh4fP6gnNfTNYPS7remvBBAzs-foypmKx6vTSvo_HNmjb9EV-EhG158iUTfPLJxmR4prFzrywryGyWBhLQObaarO6XYA_fykz9QNDcu3o2M3iAx7wQlLsJMtRNQJr7jAvRPIysmrQ",
    "customer-id": "1254557155",
  },
  body: '{"query":[{"query":"what is langchain ?","queryContext":"","start":0,"numResults":10,"contextConfig":{"charsBefore":0,"charsAfter":0,"sentencesBefore":2,"sentencesAfter":2,"startTag":"%START_SNIPPET%","endTag":"%END_SNIPPET%"},"corpusKey":[{"customerId":1254557155,"corpusId":6,"semantics":0,"metadataFilter":"","lexicalInterpolationConfig":{"lambda":0.025},"dim":[]}],"summary":[{"debug":false,"chat":{"store":true,"conversationId":""},"maxSummarizedResults":5,"responseLang":"eng","summarizerPromptName":"vectara-summary-ext-v1.2.0","factualConsistencyScore":true}]}]}',
  method: "post",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));
