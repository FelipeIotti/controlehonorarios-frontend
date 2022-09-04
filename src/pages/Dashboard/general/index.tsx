import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import Chart from "react-apexcharts"
import { api } from '../../../services/apiClient';
import { IGroupActionDTO } from '../../../dtos/IGroupActionDTO';
import { ILawyersDTO } from '../../../dtos/ILawyersDTO';
import { IClientsDTO } from '../../../dtos/IClientsDTO';
import { IFeesDTO } from '../../../dtos/IFeesDTO';


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


export function General(){
  const [general, setGeneral] = useState<GeneralProps[]>([]);
  const [generalQuantity, setGeneralQuantity] = useState<GeneralProps[]>([]);
  const [lawyers, setLawyers] = useState<ILawyersDTO[]>([]);
  const [clients, setClients] = useState<IClientsDTO[]>([]);
  const [fees, setFees] = useState<IFeesDTO[]>([]);

  const lawyersName = lawyers.map(lawyer =>{return lawyer.name});
  
  const lawyersQuantity = generalQuantity.map(general=>{return general.total})

  function CalculateTotalQuantity (object: GeneralProps[]){
    const januaryT = object.reduce((total, object) => total + object.january, 0);
    const februaryT = object.reduce((total, object) => total + object.february, 0);
    const marchT = object.reduce((total, object) => total + object.march, 0);
    const aprilT = object.reduce((total, object) => total + object.april, 0);
    const mayT = object.reduce((total, object) => total + object.may, 0);
    const juneT = object.reduce((total, object) => total + object.june, 0);
    const julyT = object.reduce((total, object) => total + object.july, 0);
    const augustT = object.reduce((total, object) => total + object.august, 0);
    const septemberT = object.reduce((total, object) => total + object.september, 0);
    const octoberT = object.reduce((total, object) => total + object.october, 0);
    const novemberT = object.reduce((total, object) => total + object.november, 0);
    const decemberT = object.reduce((total, object) => total + object.december, 0);
    

    const generalTotal = [
      januaryT,
      februaryT,
      marchT,
      aprilT,
      mayT,
      juneT,
      julyT,
      augustT,
      septemberT,
      octoberT,
      novemberT,
      decemberT,
    ]

    return generalTotal;
  }

  const valorTotal = general.reduce((total, general) => total + general.total, 0).toLocaleString("pt-BR");
    
  const generalQuantityTotal = {
    name: 'series-1' ,
    data: CalculateTotalQuantity(generalQuantity),
  
  }
  const generalFeesTotal = {
    name: 'series-1' ,
    data: CalculateTotalQuantity(general),
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

  const pieOptions:any = {
    labels: lawyersName,
    title: {
      text: 'Honorários',
      align: 'center',
      margin: 10,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#fff'
      }
    },
    text:{
      colors: '#FFFFFF',
    },
    chart: {
      toolbar:{
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip:{
      enabled: false,
    },
    
    legend:{
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      labels: {
        colors: '#fff',
        useSeriesColors: false
      },
    },
    stroke: {
      show: false,
    },
    
  };

  useEffect( () => {
    api.get('/lawyers/general').then(response => setGeneral(response.data));
    api.get('/fees/generalQuantity').then(response => setGeneralQuantity(response.data));
    api.get('/lawyers').then(response=> setLawyers(response.data));
    api.get('/clients').then(response=> setClients(response.data));
    api.get('/fees').then(response=> setFees(response.data));
  },[]); 
  
  return (
    <Flex direction='row' >
      <Box >
        <Text>Advogados</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5' >
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {lawyers.length}
          </Flex>
        </Box>
        <Text>Clientes</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {clients.length}
          </Flex>
        </Box>

        <Text>Ações</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='2xl' >
            {fees.length}
          </Flex>
        </Box>
        <Text>Valor Total</Text>
        <Box w='150px' h='95px' bg='gray.800' borderRadius='lg' mb='5'>
          <Flex justify='center' align='center' width='100%' height='100%' fontSize='xl' >
            R$ {valorTotal}
          </Flex>
        </Box>
      </Box>
      <Box textAlign='center'>
        <Text>Quantidade de Ações</Text>
        <Chart options={barState.options} series={[generalQuantityTotal]} type="bar" height='240' width="790" />
        <Text>Honorários (R$)</Text>
        <Chart options={barState.options} series={[generalFeesTotal]} type="bar" height='240' width="790" />
      </Box>
      <Box>
        <Chart options={pieOptions} series={lawyersQuantity} type='donut' width='270'height='450'/>
      </Box>
    </Flex>
  );
}