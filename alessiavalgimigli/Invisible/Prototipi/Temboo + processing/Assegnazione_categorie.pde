import com.temboo.core.*;
import com.temboo.Library.Twitter.Search.*;

// Create a session using your Temboo account application details
TembooSession session = new TembooSession("alessiavalgimigli", "myFirstApp", "i64A9kT4qJ9fJ80y4LKyYcEOeFxfQ32Y");

//Account twitter
String accessToken = "1392768027884670977-qdgqwC482B15poFJ5HqHfVdOmn7DlC";
String accessTokenSecret = "UGtUjLlrJbNTBTqYQYnMfffWuxm0OGs2rELScfGCuPK1v";
String APIkey = "VCkoWBPr8jsCC5FEw0bOMdd5H";
String APISecret = "XgBkJDS4Vxr3E2XlG4FM9pIIwysroWP2O4cbbHU1LtAO4j3LiF";

//Elenco parole
StringList listaParole = new StringList ("nigger", "nigga", "pickey", "gipsy", "faggot", "queer", "dyke", "whore", "bitch", "slut", "skank", "gimpy", "crippie");

int quale;
String parolaRicercata;
String fraseTweet;

//Categorie
StringList omofobia = new StringList ("frocio", "ricchione");
StringList misoginia = new StringList ("puttana", "troia");

void setup() {
  size(1200, 600);
  // Run the LatestTweet Choreo function
  runLatestTweetChoreo();
}

void draw() {
  textSize(12);
  text(fraseTweet, 10, 30);

  for (int i=0; i<omofobia.size(); i++) {
    if (omofobia.get(i)==parolaRicercata) {
      fill(245, 85, 68);
    }
  }

  for (int k=0; k<misoginia.size(); k++) {
    if (misoginia.get(k)==parolaRicercata) {
      fill(81, 43, 255);
    }
  }
}

void runLatestTweetChoreo() {
  // Create the Choreo object using your Temboo session
  LatestTweet latestTweetChoreo = new LatestTweet(session);

  ////////////////////////////////////////////////////
  //provo ad estrarre la query da un array di parole//
  ////////////////////////////////////////////////////

  //mi restituisce un numero che poi utilizzo per parsare l'array delle parole
  quale=int(random(listaParole.size()));

  parolaRicercata=listaParole.get(quale);
  println(parolaRicercata + " è la parola ricercata");

  // Set inputs
  latestTweetChoreo.setAccessToken(accessToken);
  latestTweetChoreo.setAccessTokenSecret(accessTokenSecret);
  latestTweetChoreo.setConsumerSecret(APISecret);
  latestTweetChoreo.setConsumerKey(APIkey);
  latestTweetChoreo.setQuery(parolaRicercata);


  // Run the Choreo and store the results
  LatestTweetResultSet latestTweetResults = latestTweetChoreo.run();  

  // Print results
  println(latestTweetResults.getID());
  println(latestTweetResults.getLimit());
  println(latestTweetResults.getRemaining());
  println(latestTweetResults.getReset());
  println(latestTweetResults.getScreenName());
  println(latestTweetResults.getText());
  println(latestTweetResults.getResponse());

  //prendo dal JSON il text, per poterlo scrivere nella canvas
  fraseTweet=latestTweetResults.getText();
}
