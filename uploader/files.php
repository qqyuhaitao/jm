<?php
mb_internal_encoding('gbk');

function getFile($dir) {/*{{{*/
    $fileArray[]=NULL;
    if (false != ($handle = opendir ( $dir ))) {
        $i = 0;
        while ( false !== ($file = readdir ( $handle )) ) {
            if ($file != "." && $file != ".."&& strpos($file,".")) {
                $fileArray[$i] = $file;
                $i++;
            }
        }
        closedir ( $handle );
    }
    return $fileArray;
}/*}}}*/
$pdfPath = dirname(__FILE__).'/../pdf';

if ($_GET['file'])
{
    if ($_POST['_method'] == 'delete')
    {
        $pdfFilePath = $pdfPath.'/'.$_GET['file'];
        if (file_exists($pdfFilePath)) 
        {
            $fstat = fstat(fopen($pdfFilePath, "r"));
            if ($fstat['mtime'] > strtotime(date('Y-m-d',time())))
            {
                if (unlink($pdfFilePath))
                {
                    echo $pdfFilePath." 删除成功\n";
                }
            }
        }
    }
} else if ($_FILES['newfile']['name']) {
    $pdfName = $_FILES['newfile']['name'];
    $pdfFilePath = $pdfPath.'/'.$pdfName;
    if (false == file_exists($pdfFilePath))
    {
        if (move_uploaded_file($_FILES['newfile']['tmp_name'], $pdfFilePath)) 
        {
            echo $pdfName." 上传完成\n";
        }
    }
} else {
    $pdfList = getFile($pdfPath);
    $pdfFileArr = array();
    foreach ($pdfList as $id => $pdfFile)
    {
        $fstat = fstat(fopen($pdfPath.'/'.$pdfFile, "r"));
        if ($fstat['mtime'] > strtotime(date('Y-m-d',time())))
        {
            $pdfFileArr[] = '{"id":'.$id.',"name":"'.$pdfFile.'","size":"'.round($fstat["size"]/1024/1024, 2).' MB"}';
        }
    }
    echo '['.implode(', ', $pdfFileArr).']';
}
