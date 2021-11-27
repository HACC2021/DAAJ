import React from 'react';
import { Container, Grid, Image, Card } from 'semantic-ui-react';





class Landing extends React.Component {

  items = [
    {
      header: 'Monk Seals',
      description: 'Of all marine mammals, the Hawaiian monk seal (ʻilio holo ika ua ua) is the most endangered in the pinniped family (seals, sea lions and walrus) in the western hemisphere and is listed as endangered under the Endangered Species Act.',
      image: '/images/monk.jpeg',
    },
    {
      header: 'Sea Turtles',
      description: 'The green sea turtle (honu) is categorized as threatened under the Endangered Species Act while the hawksbill turtle (honu ‘ea or ʻea) is categorized as endangered under the Endangered Species Act.',
      image: '/images/turtle.jpeg',
    },
    {
      header: 'Sea Birds',
      description: 'Hawaii’s seabirds travel widely throughout the Pacific and are therefore very important sentinel species. Like “canaries in a coal mine," seabirds can help us understand ecosystem changes that not only affect the birds themselves but pose serious risks to humans.',
      image: '/images/seabird.jpeg',
    },
    {
      header: 'Spinner Dolphins',
      description: 'The spinner dolphin (nai’a or ka nai’a) is not currently listed under the Endangered Species Act but is protected under the Marine Mammal Protection Act.',
      image: '/images/dolphins.jpeg',
    },
    {
      header: 'Humpback Whales',
      description: 'The humpback whale (koholā or koholā kuapi’o) is not currently listed under the Endangered Species Act but is protected under the Marine Mammal Protection Act.',
      image: '/images/whale.jpeg',
    },

  ]


  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
        <Grid.Row>
        <Grid.Column width={6}>
          <Image size='huge' circular src="/images/logotransparent.png"/>
        </Grid.Column>
        <Grid.Column width={8}>
          <h1 style={{fontFamily: 'Poppins'}}>E komo mai!</h1>
         <p>Wahi is a two part system that enables anyone to help preserve and recover Hawaii's marine protected species.</p>
           <p>Wahi Web displays the table of reports in a list view and a map view. Statistics are also visualized on the charts view page. </p>
          <p>Wahi Mobile allows you to report sightings of animals or call the hotline when you see an animal in distress.</p>
        </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
          <h2 style={{fontFamily: 'Poppins'}}>Types of Species</h2>
        </Grid.Row>
        <Grid.Row>
          <Container>
          <Card.Group style={{fontFamily: 'Poppins'}} centered items={this.items} ></Card.Group>
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
