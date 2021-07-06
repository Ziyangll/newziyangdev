import "../css/styles.css";

function Resume() {
  return (
    <div className='page-container'>
      <div className='iframe'>
        <div className='resume-download-button'>
          <a
            className='button'
            href='https://drive.google.com/file/d/1X8CGkpAO3g_e5gmT8QZczrWgbmtfUTjB/view?usp=sharing'
          >
            DOWNLOAD
          </a>
        </div>

        <iframe
          title='resume'
          className='resume'
          src='https://drive.google.com/file/d/1X8CGkpAO3g_e5gmT8QZczrWgbmtfUTjB/preview'
        >
          Your browser doesn't support iframes
        </iframe>
      </div>
    </div>
  );
}

export default Resume;
