import React, { useEffect, useState } from 'react';
import { Box, Flex, FormControl, Select, Text } from '@chakra-ui/react';

import Chart from "react-apexcharts"
import api from '../../../services/api';
import { IGroupActionDTO } from '../../../dtos/IGroupActionDTO';


interface GeneralProps {
  data: IGroupActionDTO;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  total: number;
}

interface ISeries {
  name: string;
  data: (number | undefined)[];
}

export function Lawyers(){
  const [general, setGeneral] = useState<GeneralProps[]>([]);
  const [generalQuantity, setGeneralQuantity] = useState<GeneralProps[]>([]);
  const [generalStatus, setGeneralStatus] = useState<GeneralProps[]>([]);

  const [generalSelected1, setGeneralSelected1] = useState<GeneralProps | undefined>();
  const [generalQuantitySelected1, setGeneralQuantitySelected1] = useState<GeneralProps| undefined>();
  const [generalStatusSelected1, setGeneralStatusSelected1] = useState<GeneralProps| undefined>();

  const [generalSelected2, setGeneralSelected2] = useState<GeneralProps| undefined>();
  const [generalQuantitySelected2, setGeneralQuantitySelected2] = useState<GeneralProps| undefined>();
  const [generalStatusSelected2, setGeneralStatusSelected2] = useState<GeneralProps| undefined>();

  const [series1, setSeries1] = useState<ISeries>({} as ISeries);
  const [series2, setSeries2] = useState<ISeries>({} as ISeries);

  const [seriesStatus1, setSeriesStatus1] = useState<ISeries>({} as ISeries);
  const [seriesStatus2, setSeriesStatus2] = useState<ISeries>({} as ISeries);

  function handleSelect1(event: string) {
    const selectGeneral = general.filter(generaL=> {return generaL.data.name === event})[0];
    console.log(selectGeneral)
    setGeneralSelected1(selectGeneral);

    const selectGeneralQuantity = generalQuantity.filter(generaL=> {return generaL.data.name === event})[0];

    setGeneralQuantitySelected1(selectGeneralQuantity);

    const selectGeneralStatus = generalStatus.filter(generaL=> {return generaL.data.name === event})[0];

    setGeneralStatusSelected1(selectGeneralStatus);  
    
    const seriesGeneralLawyer1 = [
      generalSelected1?.january, 
      generalSelected1?.february, 
      generalSelected1?.march, 
      generalSelected1?.april, 
      generalSelected1?.may, 
      generalSelected1?.june, 
      generalSelected1?.july, 
      generalSelected1?.august, 
      generalSelected1?.september,
      generalSelected1?.october, 
      generalSelected1?.november, 
      generalSelected1?.december
    ]

    setSeries1({
      name: 'series1',
      data: seriesGeneralLawyer1
    });

    const seriesGeneralStatusLawyer1 = [
      generalStatusSelected1?.january, 
      generalStatusSelected1?.february, 
      generalStatusSelected1?.march, 
      generalStatusSelected1?.april, 
      generalStatusSelected1?.may, 
      generalStatusSelected1?.june, 
      generalStatusSelected1?.july, 
      generalStatusSelected1?.august, 
      generalStatusSelected1?.september,
      generalStatusSelected1?.october, 
      generalStatusSelected1?.november, 
      generalStatusSelected1?.december
    ]

    setSeriesStatus1({
      name: 'series1',
      data: seriesGeneralStatusLawyer1
    });

  }

  function handleSelect2(event: string) {
    const selectGeneral = general.filter(generaL=> {return generaL.data.name === event})[0];

    setGeneralSelected2(selectGeneral);

    const selectGeneralQuantity = generalQuantity.filter(generaL=> {return generaL.data.name === event})[0];

    setGeneralQuantitySelected2(selectGeneralQuantity);

    const selectGeneralStatus = generalStatus.filter(generaL=> {return generaL.data.name === event})[0];

    setGeneralStatusSelected2(selectGeneralStatus);    

    const seriesGeneralLawyer2:any = [
      generalSelected2?.january, 
      generalSelected2?.february, 
      generalSelected2?.march, 
      generalSelected2?.april, 
      generalSelected2?.may, 
      generalSelected2?.june, 
      generalSelected2?.july, 
      generalSelected2?.august, 
      generalSelected2?.september,
      generalSelected2?.october, 
      generalSelected2?.november, 
      generalSelected2?.december
    ]

    setSeries2({
      name: 'series2',
      data: seriesGeneralLawyer2
    });

    const seriesGeneralStatusLawyer2:any = [
      generalStatusSelected2?.january, 
      generalStatusSelected2?.february, 
      generalStatusSelected2?.march, 
      generalStatusSelected2?.april, 
      generalStatusSelected2?.may, 
      generalStatusSelected2?.june, 
      generalStatusSelected2?.july, 
      generalStatusSelected2?.august, 
      generalStatusSelected2?.september,
      generalStatusSelected2?.october, 
      generalStatusSelected2?.november, 
      generalStatusSelected2?.december
    ]

    setSeriesStatus2({
      name: 'series2',
      data: seriesGeneralStatusLawyer2
    });
  }



  const barState:any = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar:{
          show: false,
        },
        zoom: {
          enabled: true,
        }
      },
      xaxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"],
        labels: {
          show: true,
          style: {
              colors: '#fff',
              fontSize: '12px',
              fontWeight: 500,
          },
        }
      },
      dataLabels: {
        enabled: true,
      },
      tooltip:{
        enabled: false,
      },
      fill: {
        type: 'solid',
        colors: ['#6B46C1','#B83280'],
      },
      legend:{
        show: false,
      },
      stroke: {
        show: false,
      },
      grid: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      
    },
    
  };

  

  useEffect( () => {
    api.get('/lawyers/general').then(response => setGeneral(response.data));
    api.get('/lawyers/generalQuantity').then(response => setGeneralQuantity(response.data));
    api.get('/lawyers/generalStatus').then(response => setGeneralStatus(response.data));
  },[]); 
  return (
    <Flex direction='row' >
      <Box spacing={4} mr='5' >
        <Text>Advogado</Text>
        <FormControl mr='5' w='100%' h='115px'>
          <Select  onChange={event=>handleSelect1(event.target.value)} >
            {general.map(general =>(
              <option key={general.data.id}>
                {general.data.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Text>Ações</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {generalQuantitySelected1?.total}
          </Flex>
        </Box>

        <Text>Ações Concluídas</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {generalStatusSelected1?.total}
          </Flex>
        </Box>
        <Text>Honorários</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='xl' >
            R$ {generalSelected1?.total}
          </Flex>
        </Box>
      </Box>
      <Box spacing={4}>
        <Text>Advogado</Text>
        <FormControl mr='5' w='100%' h='115px'>
          <Select  onChange={event=>handleSelect2(event.target.value)} >
            {general.map(general =>(
              <option key={general.data.id}>
                {general.data.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Text>Ações</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {generalQuantitySelected2?.total}
          </Flex>
        </Box>

        <Text>Ações Concluídas</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {generalStatusSelected2?.total}
          </Flex>
        </Box>
        <Text>Honorários</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='xl' >
            R$ {generalSelected2?.total}
          </Flex>
        </Box>
      </Box>
      <Box ml='5' textAlign='center'>
        <Text>Honorários</Text>
        <Chart options={barState.options} series={[series1,series2]} type="bar" height='240' width="870" />
        <Text>Ações Concluídas</Text>
        <Chart options={barState.options} series={[seriesStatus1,seriesStatus2]} type="bar" height='240' width="870" />
      </Box>
    </Flex>
  );
}