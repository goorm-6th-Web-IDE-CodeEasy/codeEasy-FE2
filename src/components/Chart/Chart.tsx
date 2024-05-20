import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { MenuItem, Select } from '@mui/material'
import { ThemeState } from '../../pages/Theme/ThemeState'
import { useRecoilValue } from 'recoil'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ProblemHistoryData {
    date: string
    problemsSolved: number
}

interface ProblemHistoryChartProps {
    historyData: ProblemHistoryData[]
}

export const ProblemHistoryChart = ({ historyData }: ProblemHistoryChartProps) => {
    const [timeFrame, setTimeFrame] = useState('week') // 드롭다운 상태
    const theme = useRecoilValue(ThemeState)
    const [filteredData, setFilteredData] = useState<ProblemHistoryData[]>([])

    useEffect(() => {
        const filterData = () => {
            const today = new Date()
            const filtered = historyData.filter((data) => {
                const dataDate = new Date(data.date)
                const timeDiff = (today.getTime() - dataDate.getTime()) / (1000 * 3600 * 24)
                switch (timeFrame) {
                    case 'week':
                        return timeDiff <= 7
                    case 'month':
                        return timeDiff <= 30
                    case 'year':
                        return timeDiff <= 365
                    default:
                        return true
                }
            })
            setFilteredData(filtered)
        }

        filterData()
    }, [timeFrame, historyData])

    const labels = filteredData.map((data) => new Intl.DateTimeFormat('ko-KR').format(new Date(data.date)))
    const data = {
        labels,
        datasets: [
            {
                label: '문제 풀이 수',
                data: filteredData.map((data) => data.problemsSolved),
                borderColor: 'var(--primary-color)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 35, // 최대 y축 값 설정
                ticks: {
                    color: 'var(--font-color)', // y축 눈금 색상
                },
            },
            x: {
                ticks: {
                    color: 'var(--font-color)', // x축 눈금 색상
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'var(--font-color)', // 범례 색상
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: 'var(--background-color)', // 툴팁 배경색
                titleColor: 'var(--font-color)', // 툴팁 제목 색상
                bodyColor: 'var(--font-color)', // 툴팁 내용 색상
            },
        },
    }

    return (
        <div>
            <div className={`mode_${theme}`}>
                <Select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{
                        backgroundColor: 'var(--background-color)',
                        color: 'var(--font-color)',
                        border: `1px solid var(--primary-color)`,
                    }}
                >
                    <MenuItem value="week">week</MenuItem>
                    <MenuItem value="month">month</MenuItem>
                    <MenuItem value="year">year</MenuItem>
                </Select>
            </div>
            {filteredData.length > 0 ? (
                <div style={{ width: '100%', height: '18rem' }}>
                    <Line data={data} options={options} />
                </div>
            ) : (
                <p style={{ color: 'var(--font-color)' }}>선택된 기간 내에 데이터가 없습니다.</p>
            )}
        </div>
    )
}
