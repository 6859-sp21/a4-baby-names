# a4-baby-names
a4-baby-names created by GitHub Classroom

By Elizabeth Weeks & Benton Wilson

## Design Decisions 
After selecting the data we decided that it would be interesting to do a bar chart race since we personally find bar chart races interesting to watch and the data is set up nicely for it.  We wanted to include the option to select your own name to make it more interesting for viewers without popular names (such as Benton).  We also decided to add numerous filters to make it even more customizable for a viewer. 

We originally had all of the bars set to be a different color and the selected bars were surrounded with a white outline.  During the peer review we recieved feedback that this was confusing and decided to make all of the bars a single color. We then thought it was a good idea to change the color of the selcted bars instead of outlining them to make it even clearer which bars have been inputted by the user. 

We originally had the number of bars set to always be 20.  Some of our feedback stated that this was somewhat overwhelming so we decided to make this number adjustable by the user.  We also thought this would be useful if a user only wanted to see names they have inputed instead of a preset number of names. 

Given the fact that the user can change the number of bars to only contain selected names we decided to scale the bars so that the longest on screen bar was the length of the svg.  This makes is easier to differntiate between smaller bars when there are no large bars visible. 

After the peer review we recieved feedback that it would be nice if the slider had visible dates.  After looking at the html documentation this seemed like an easy add but we discovered that the capability to add labels to tick marks is not supported on most browsers.  We ended up hard coding the placement of the labels which is why they are not completely centered on the tick marks. 

Both of us have very limited front end experience and given that the theme is baby names we decided we did not want to go for a super modern aesthetic.  Instead we went for a cutesy aesthetic that gave of baby vibes. 


## Development Process
We worked on this project in 3 main chunks.  Most of these chunks were in person pair programming since we are in the same self formed(off-campus) pod.  

Our first chunk was around 10 hours of pair programming. During this time we decided what type of visualization we wanted to make.  The first step was to process the data since each year was stored in its own separate file.  We then started by creating a static bar chart.  Our main issue was figuring out how to use the data join process for the bar charts and text.  We spent a decent amount of our time working on this as we had bugs with bars and text not being removed or being duplicated.  We eventually solved the bug with a change from selectAll to select.  Once we resolved this we added the play/pause and reset button and planned out the other changes we wanted to make.  

Our second chunk was around 7 hours which was again pair programming.  We started by changing the way we were filtering the data in order to make the program faster.  We then added more buttons such as the year input and arrow keys which is linked to the slider and year display as well.  This is when we added the names filter with the clear and add buttons.  We also added the informational text and the both/female/male buttons.  In addition,  we began styling the visualization by standardizing the colors and adding the background.  We then began to work on our video demo.  For this we took turns recording voice over and performing what we were discussing on the screen.  We then edited the presentation in iMovie. 

Our last chunk was about 5 hours each after the peer review feedback was received.  This was partially pair programming with some final touches being implemented individually.  For this we needed to make updates based on the feedback.  These included changing the bar colors to the standard brown color and making the selected bars their own color.  We also removed the sex from the bars and separated the name and count to opposite ends of the bar.  Furthermore, we added ticks and labels to the slider.  We also made the bars transition in a smoother fashion.  We added the ability to choose the number of bars and changed the bars so that the top bar is the full length of the svg.

Total we spent around 22 hours each working on this project and the initial data join is what took the most time. 
