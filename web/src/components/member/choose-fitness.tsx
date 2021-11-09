import axios from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, CardBody, Col, CardTitle, CardImg, CardImgOverlay } from 'reactstrap';

const ChooseFitness: FC = () => {

  const [fitnessTypes, setFitnessTypes] = useState<{ type: string; img: string; }[]>([]);
  
  const fetchFitnessTypes = useCallback(async () => {
    try {
      const {data: {fitness}} = await axios.get('/api/fitness');
  
      setFitnessTypes(fitness);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchFitnessTypes();
  }, [fetchFitnessTypes]);

  return (
    <>
      <h1>Choose Fitness Type</h1>
      <div className="d-flex overflow-auto">
        {fitnessTypes.map((fitnessType, key) => (
          <Card className="custom-card" key={key} tag={Col} md={4} style={{cursor: 'pointer'}}>
            <CardImgOverlay className="custom-img-overlay">
              <span>
                <CardTitle tag="h5">{fitnessType.type}</CardTitle>
              </span>
            </CardImgOverlay>
            <CardImg className="img-fluid h-100 w-100" src={fitnessType.img} alt={fitnessType.type} style={{objectFit: 'cover'}} />
          </Card>
        ))}
      </div>
    </>
  )
}

export default ChooseFitness;