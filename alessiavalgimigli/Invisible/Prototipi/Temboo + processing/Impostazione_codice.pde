import com.temboo.core.*;
import com.temboo.Library.Twitter.Search.*;

// Create a session using your Temboo account application details
TembooSession session = new TembooSession("alessiavalgimigli", "myFirstApp", "i64A9kT4qJ9fJ80y4LKyYcEOeFxfQ32Y");


//Account twitter
String accessToken = "1392768027884670977-rmHkksGPPF3BDZLXPivs8T9f9WB3Wj";
String accessTokenSecret = "2yBSHSUiAGPSCgXZBxPubhIWa4DjFuHLE9ymAKsKCeQPM";
String APIkey = "ao6etiuiMDQvKxMLR6U9uKOJP";
String APISecret = "7hqjydiMHn27ACkKWnlBiEjF2To26CHyx4PZfIIPJzaRIfZy69";

//variabile per estrapolare il text del JSON
String fraseTweet;

void setup() {
  size(600, 600);
  // Run the LatestTweet Choreo function
  runLatestTweetChoreo();  
}

void draw() {
 textSize(12);
 text(fraseTweet, 10, 30);
}

void runLatestTweetChoreo() {
  // Create the Choreo object using your Temboo session
  LatestTweet latestTweetChoreo = new LatestTweet(session);

  // Set inputs
  latestTweetChoreo.setAccessToken(accessToken);
  latestTweetChoreo.setAccessTokenSecret(accessTokenSecret);
  latestTweetChoreo.setConsumerSecret(APISecret);
  latestTweetChoreo.setConsumerKey(APIkey);
  latestTweetChoreo.setQuery("frocio");

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
  
  fraseTweet=latestTweetResults.getText();
}
