'use client';

import React, { useState, useEffect } from 'react';
import ConnectivityTestStepOne from './connectivity-test-step-one';
import ConnectivityTestStepTwo from './connectivity-test-step-two';
import ConnectivityTestStepThree from './connectivity-test-step-three';
import ConnectivityTestStepFour from './connectivity-test-step-four'

function ConnectivityTestInstructions({ updateDashboardLayout, projectId, dashboardLayout, projectName, projectDescription}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      component: (
        <ConnectivityTestStepOne 
          projectId={projectId} 
          dashboardLayout={dashboardLayout} 
          deviceInfo={`{"metadata": {"deviceName": "${projectName}", "description": "${projectDescription}"}, "layout": ${JSON.stringify(dashboardLayout)} }`}
        />
      ),
    },
    {
      id: 1,
      component: <ConnectivityTestStepTwo />,
    },
    {
      id: 2,
      component: <ConnectivityTestStepThree updateDashboardLayout={updateDashboardLayout}/>,
    },
    {
      id: 3,
      component: <ConnectivityTestStepFour/>,
    },
  ];

  const nextStep = () => {

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div>{steps[currentStep].component}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button onClick={previousStep} disabled={currentStep === 0}>Previous</button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
}

export default ConnectivityTestInstructions;
