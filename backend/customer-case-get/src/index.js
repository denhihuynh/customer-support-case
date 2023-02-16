const functions = require("@google-cloud/functions-framework");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

module.exports = functions.http("main", async (req, res) => {
  const body = req.body;
  try {
    let doc
    if (body.caseId) {
      console.log(`Fetching customer case with id ${body.caseId}`)
      doc = await firestore.collection("SupportCase").get(body.caseId);
      if (!doc.exists) {
        console.log('No such document!');
        res.send(404)
      } else {
        console.log('Document data:', doc.data());
        res.status(200).json(doc.data());
      }
    } else {
      console.log('Fetching all customer cases')
      const snapshot = await firestore.collection("SupportCase").get();
      if (snapshot.empty) {
        res.send(404)
        return;
      }  
      const supportCases = []
      snapshot.forEach(doc => {
        supportCases.push(doc.data())
      });
      res.status(200).json(supportCases);
    }
   
  } catch (error) {
    console.log("Got error", JSON.stringify(error.message, null, 2));
    console.log("Statuscode", JSON.stringify(error.statusCode, null, 2));
    res.status(500).send("Error creating document.");
  }
});
